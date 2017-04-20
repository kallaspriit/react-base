/* eslint-disable no-console */

import path from 'path';
import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { Spinner } from 'cli-spinner';
import { watch } from 'chokidar';
import opn from 'opn';
import 'colors';
import startDevServer from '../services/dev-server';
import startGraphqlServer from '../../server/server';
import { generateViewsIndex } from '../services/indexer';
import reportWebpackStats from '../services/webpack-stats-reporter';
import webpackConfig from '../webpack/webpack.dev';
import paths from '../../config/paths';
import graphqlServerConfig from '../../config/server-config';

// dev server configuration (used by both webpack dev middleware and express)
const serverConfig = {
	host: '0.0.0.0',
	port: 3000,
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
};

// setup compiler and dev server
const compiler = webpack(webpackConfig);

// create the express server app and middlewares
const app = express();
const devMiddleware = webpackDevMiddleware(compiler, serverConfig);
const hotMiddleware = webpackHotMiddleware(compiler, {
	log: null, // disable logs
});

// add the webpack middlewares
app.use(devMiddleware);
app.use(hotMiddleware);

// configure compiler
let compileStartTime = Date.now();
let isFirstDone = true;

// setup spinner
const spinner = new Spinner('Please wait..');
spinner.setSpinnerString(19);

// called when the compiler starts compiling
compiler.plugin('compile', (_params) => {
	compileStartTime = Date.now();

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

	const compileTimeTaken = Date.now() - compileStartTime;

	// open web browser on first done event
	if (isFirstDone) {
		const indexUrl = `http://localhost${serverConfig.port !== 80 ? `:${serverConfig.port}` : ''}/`;

		console.log(`Development server started at ${indexUrl.bold} (${compileTimeTaken}ms)`);

		// start a development server in the background
		startDevServer();

		// also start the graphql server
		startGraphqlServer(graphqlServerConfig);

		// watch for view file changes and regenerate the index
		const watcher = watch(paths.views, {
			ignoreInitial: true,
		});

		// regenerate views index if the changed file is in views directory
		watcher.on('addDir', (_path) => {
			// console.log(`${path.bold} was added, regenerating index`);

			generateViewsIndex();
		});
		watcher.on('unlinkDir', (_path) => {
			// console.log(`${path.bold} was removed, regenerating index`);

			generateViewsIndex();
		});

		// open in browser
		opn(indexUrl);

		isFirstDone = false;
	} else {
		// console.log(`${' UPDATED '.bgGreen.black} in ${compileTimeTaken}ms`);
	}
});

// generate indexes
generateViewsIndex();

// test custom route
app.get('/test', (request, response, _next) => {
	response.json({
		test: true,
	});
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

// start the dev server on given port
app.listen(serverConfig, () => {
	spinner.setSpinnerTitle('Starting development server, please wait..'.bold);
	spinner.start();
});
