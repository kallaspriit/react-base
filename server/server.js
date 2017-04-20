/* eslint-disable no-console */

import path from 'path';

import 'colors';
import enableDestroyServer from './services/enable-destroy-server';
import createServerApp from './services/create-server-app';
import watchChange from './services/watch-change';

// export as function so other resources could start it
export default function startServer(config) {
	let app = createServerApp(config);

	// start the server
	let server = app.listen(config, () => {
		enableDestroyServer(server);

		console.log(`GraphQL server started at ${config.url.bold}`);

		const changeWatchPattern = path.resolve(__dirname, '*.js');

		// watch for changes and restart server
		watchChange(changeWatchPattern, () => {
			server.destroy(() => {
				app = createServerApp(config);

				server = app.listen(config, () => {
					console.log('GraphQL server has been hot-reloaded');

					enableDestroyServer(server);
				});
			});
		});
	});
}
