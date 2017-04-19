/* eslint-disable no-console */

import express from 'express';
import cors from 'cors';
import opn from 'opn';
import path from 'path';
import graphqlMiddleware from 'express-graphql';
import { watch } from 'chokidar';
import 'colors';

// TODO make this nicer but it works..

function createApp(config) {
	// get the latest schema, invalidate the require cache
	delete require.cache[require.resolve('./schema/schema')];
	const schema = require('./schema/schema').default; // eslint-disable-line global-require

	// create express server
	const app = express();

	// enable cors
	app.use(cors());

	// create the graphql endpoint
	app.use(config.endpoint, graphqlMiddleware({
		schema,
		graphiql: true,
	}));

	return app;
}

function enableDestroy(server) {
	const connections = {};

	server.on('connection', (conn) => {
		const key = `${conn.remoteAddress}:${conn.remotePort}`;

		connections[key] = conn;

		conn.on('close', () => {
			console.log(`${key} closed`);

			delete connections[key];
		});
	});

	server.destroy = (cb) => { // eslint-disable-line no-param-reassign
		server.close(cb);

		Object.keys(connections).forEach((key) => {
			console.log(`destroy ${key}`);

			connections[key].destroy();

			delete connections[key];
		});
	};
}

// export as function so other resources could start it
export default function startServer(config) {
	// create express server
	let app = createApp(config);

	// start the server
	let server = app.listen(config, () => {
		enableDestroy(server);

		opn(config.url);

		console.log(`GraphQL server started at ${config.url.bold}`);

		// watch for changes
		const watchPattern = path.resolve(__dirname, 'schema', '*.js');

		console.log(`watching ${watchPattern.bold}`);

		// watch for schema changes
		const watcher = watch(watchPattern, {
			ignoreInitial: true,
		});

		watcher.on('change', (filename) => {
			console.log(`file ${filename.bold} was changed, closing server..`);

			server.destroy(() => {
				console.log('destroyed..');
			});

			server.close(() => {
				console.log('restarting..');

				app = createApp(config);

				server = app.listen(config, () => {
					console.log('server has been restarted');

					enableDestroy(server);
				});
			});
		});
	});

	// watcher.on('add', (filename) => {
	// 	console.log(`file ${filename.bold} was added`);
	// });
	// watcher.on('unlink', (filename) => {
	// 	console.log(`file ${filename.bold} was deleted`);
	// });
	// watcher.on('addDir', (dir) => {
	// 	console.log(`dir ${dir.bold} was added`);
	// });
	// watcher.on('ready', () => {
	// 	console.log('watcher is ready');
	// });
}
