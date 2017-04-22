import express from 'express';
import sessionMiddleware from 'express-session';
import bodyParser from 'body-parser';
import opn from 'opn';
import path from 'path';
import { Spinner } from 'cli-spinner';
import config from 'config';
import 'colors';
import configureGraphqlServer from '../../server/services/configure-server';
import paths from '../../build/paths';

const productionConfig = config.get('production-server');

// configuration
const serverConfig = {
	port: 80,
	...productionConfig,
};

// setup spinner
const spinner = new Spinner('Starting production server, please wait..'.bold);
spinner.setSpinnerString(19);
spinner.start();

// track time
const startTime = Date.now();

// create the express server app
const app = express();

// add support for various payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// add support for sessions
app.use(sessionMiddleware({
	resave: false,
	saveUninitialized: false,
	...productionConfig.session,
}));

// serve the static production application
app.use(
	express.static(paths.dist, {
		index: 'index.html',
	}),
);

// add graphql server middleware
configureGraphqlServer(app);

// default route, serve the single-page app
app.use('*', (request, response, _next) => {
	const filename = path.join(paths.dist, 'index.html');

	response.sendFile(filename);
});

// start the server
app.listen(serverConfig, () => {
	// stop the spinner
	spinner.stop(true);

	// the application is served from this url
	const indexUrl = `http://localhost${serverConfig.port !== 80 ? `:${serverConfig.port}` : ''}`;
	const timeTaken = Date.now() - startTime;

	// provide some help
	console.log(`${' SERVER STARTED '.bgGreen.black} on ${indexUrl.bold} in ${timeTaken}ms (${process.env.NODE_ENV})`);
	console.log(`> The pre-built application is served from ${paths.dist.bold}`);
	console.log(`> This is a static application server. For development with hot-reload use ${'> npm start'.bold}`);
	console.log(`> Press ${'CTRL+C'.bold} to stop the server`);

	// open in browser
	opn(indexUrl);
});
