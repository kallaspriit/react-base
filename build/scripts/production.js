import express from 'express';
import bodyParser from 'body-parser';
import opn from 'opn';
import path from 'path';
import { Spinner } from 'cli-spinner';
import 'colors';
import configureGraphqlServer from '../../server/services/configure-server';
import paths from '../../build/paths';

// configuration
const port = 80; // TODO make configurable

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
app.listen({
	port,
}, () => {
	// stop the spinner
	spinner.stop(true);

	// the application is served from this url
	const indexUrl = `http://localhost${port !== 80 ? `:${port}` : ''}`;
	const timeTaken = Date.now() - startTime;

	// provide some help
	console.log(`${' SERVER STARTED '.bgGreen.black} on ${indexUrl.bold} in ${timeTaken}ms`);
	console.log(`> The pre-built application is served from ${paths.dist.bold}`);
	console.log(`> This is a static application server. For development with hot-reload use ${'> npm start'.bold}`);
	console.log(`> Press ${'CTRL+C'.bold} to stop the server`);

	// open in browser
	opn(indexUrl);
});
