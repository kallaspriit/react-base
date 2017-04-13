/* eslint-disable no-console */

import express from 'express';
import bodyParser from 'body-parser';
import 'colors';

const config = {
	port: 9991,
};

export default function start() {
	const app = express();

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.get('/', (request, response) => {
		response.json({
			success: true,
		});
	});

	app.listen(config, () => {
		console.log(`${'started dev-tools server'.green} on port ${config.port.toString().bold}`);
	});
}
