/* eslint-disable no-console */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'colors';

const config = {
	port: 9991,
};

function errorHandler(err, req, res, _next) {
	res.status(500);
	res.render('error', { error: err });
}

export default function start() {
	const app = express();

	// add support for JSON payload
	app.use(bodyParser.json());

	// enable cors
	app.use(cors());

	// handle index, respond with list of supported endpoints
	app.get('/', (request, response) => {
		response.json([{
			id: 'create-view',
			name: 'Create view',
			endpoint: '/create-view',
			method: 'POST',
			params: ['name'],
		}]);
	});

	// handle creating a new view
	app.post('/create-view', (request, response) => {
		const name = request.body.name;

		if (typeof name !== 'string' || name.length === 0) {
			throw new Error('expected non-empty string "name" parameter');
		}

		console.log('CREATE VIEW', name);

		response.json({
			success: true,
		});
	});

	// start the server
	app.listen(config, () => {
		console.log(`dev-tools server started at ${`http://localhost:${config.port}`.bold}`);
	});

	// add custom error handler
	app.use((err, req, res, next) => {
		if (res.headersSent || !req.xhr) {
			console.log('not handling error', err);

			return next(err);
		}

		console.log('handling error', err);

		res.status(500).json({
			error: err.message,
		});

		return null;
	});

	app.use(errorHandler);
}
