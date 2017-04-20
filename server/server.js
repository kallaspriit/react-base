import path from 'path';
import express from 'express';
import opn from 'opn';
import 'colors';
import enableDestroyServer from './services/enable-destroy-server';
import configureServer from './services/configure-server';
import watchChange from './services/watch-change';
import buildUrl from './services/build-url';

// export as function so other resources could start it
export default function startServer(config) {
	let app = express();

	configureServer(app);

	// start the server
	let server = app.listen(config, () => {
		enableDestroyServer(server);

		const url = buildUrl(config);

		console.log(`GraphQL server started at ${url.bold}`);

		// open graphiql
		opn(url);

		const changeWatchPattern = path.resolve(__dirname, '*.js');

		// watch for changes and restart server
		watchChange(changeWatchPattern, () => {
			server.destroy(() => {
				app = express();

				configureServer(app);

				server = app.listen(config, () => {
					console.log('GraphQL server has been hot-reloaded');

					enableDestroyServer(server);
				});
			});
		});
	});
}
