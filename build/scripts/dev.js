import path from 'path';
import webpack from 'webpack';
import express, { Router } from 'express';
import sessionMiddleware from 'express-session';
import bodyParser from 'body-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { Spinner } from 'cli-spinner';
import { watch } from 'chokidar';
import opn from 'opn';
import config from 'config';
import 'colors';
import { generateViewsIndex } from '../services/indexer';
import reportWebpackStats from '../services/webpack-stats-reporter';
import configureDevRoutes from '../services/configure-dev-routes';
import invalidateRequireCache from '../services/invalidate-require-cache';
import watchChange from '../../server/services/watch-change';
import webpackConfig from '../webpack/webpack.dev';
import paths from '../../build/paths';

const devConfig = config.get('dev-server');

// dev server configuration (used by both webpack dev middleware and express)
const serverConfig = {
	host: '0.0.0.0',
	publicPath: webpackConfig.output.publicPath,
	overlay: {
		warnings: true,
		errors: true,
	},
	stats: {
		colors: false,
	},
	quiet: true,
	noInfo: true,
	index: 'index.html',
	port: 3000,
	...devConfig,
};

// setup compiler and dev server
const compiler = webpack(webpackConfig);

// create the express server app
const app = express();

// configure webpack dev and hot-reload middlewares
const devMiddleware = webpackDevMiddleware(compiler, serverConfig);
const hotMiddleware = webpackHotMiddleware(compiler, {
	log: null, // disable logs
});

// add the webpack middlewares
app.use(devMiddleware);
app.use(hotMiddleware);

// add support for various payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// add support for sessions
app.use(sessionMiddleware({
	resave: false,
	saveUninitialized: false,
	...devConfig.session,
}));

// keep track of how long compile takes and whether it was the first compile
let startTime = Date.now();
let isFirstDone = true;

// setup spinner
const spinner = new Spinner('Please wait..');
spinner.setSpinnerString(19);

// called when the compiler starts compiling
compiler.plugin('compile', (_params) => {
	startTime = Date.now();

	spinner.setSpinnerTitle('Updating, please wait..');
	spinner.start();
});

// called when compiling fails hard
compiler.plugin('failed', (error) => {
	console.error(`${' FAILED '.bgRed.black} -${error}`);
});

// called when compiler finishes update
compiler.plugin('done', (stats) => {
	spinner.stop(true);

	reportWebpackStats(stats);

	if (stats.hasErrors()) {
		return;
	}

	const timeTaken = Date.now() - startTime;

	// open web browser on first done event
	if (isFirstDone) {
		const indexUrl = `http://localhost${serverConfig.port !== 80 ? `:${serverConfig.port}` : ''}/`;
		const graphiqlUrl = `http://localhost${serverConfig.port !== 80 ? `:${serverConfig.port}` : ''}/graphiql`;

		console.log(
			`${' SERVER STARTED '.bgGreen.black} on ${indexUrl.bold} ` +
			`in ${Math.round(timeTaken / 100) / 10}s (${process.env.NODE_ENV})`,
		);
		console.log(`> This is a development server. For production server use ${'> npm run production'.bold}`);
		console.log(`> Press ${'CTRL+C'.bold} to stop the server`);

		// open both the application and Graphqiql interface in the browser
		opn(indexUrl);
		opn(graphiqlUrl);

		isFirstDone = false;
	} else {
		// console.log(`${' UPDATED '.bgGreen.black} in ${compileTimeTaken}ms`);
	}
});

// the router can be replaced to hot-reload server resources
let router = new Router();

// all the requests go to this router
app.use((request, response, next) => {
	router(request, response, next);
});

// configure initial dev routes
configureDevRoutes(router);

// watch for server js and graphql files
const watchPatterns = [
	path.join(paths.server, '**/*.js'),
	path.join(paths.server, '**/*.gql'),
];

// watch for server file changes
watchChange(watchPatterns, () => {
	const reloadStartTime = Date.now();

	invalidateRequireCache(/[/\\]server[/\\]/);

	// create new router
	router = new Router();

	// reconfigure dev routes
	configureDevRoutes(router);

	console.log(`${'reloaded server'.bold} in ${Date.now() - reloadStartTime}ms`);
});

// default route, serve the single-page app
app.use('*', (request, response, next) => {
	const filename = path.join(compiler.outputPath, 'index.html');

	// use the in-memory compiler file system
	compiler.outputFileSystem.readFile(filename, (err, result) => {
		if (err) {
			return next(err);
		}

		response.set('content-type', 'text/html');
		response.send(result);
		response.end();

		return null;
	});
});

// generate indexes
generateViewsIndex();

// watch for view file changes and regenerate the index
const viewsWatcher = watch(paths.views, {
	ignoreInitial: true,
});

// regenerate views index if the changed file is in views directory
viewsWatcher.on('all', () => {
	generateViewsIndex();
});

// start the dev server on given port
app.listen(serverConfig, () => {
	spinner.setSpinnerTitle('Starting development server, please wait..'.bold);
	spinner.start();
});
