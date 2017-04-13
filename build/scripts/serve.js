/* eslint-disable no-console */

import serve from 'serve';
import opn from 'opn';
import 'colors';
import paths from '../../config/paths';

const port = 80; // TODO make configurable
const url = `http://localhost${port !== 80 ? `:${port}` : ''}`;

// serve the static application
serve(paths.dist, {
	port,
	single: true,
	silent: true,
});

// provide some help
console.log(`${' SERVER STARTED '.bgGreen.black} on ${url.bold}`);
console.log(`> The pre-built application is served from ${paths.dist.bold}`);
console.log(`> This is a static application server. For development with hot-reload use ${'> npm run dev'.bold}`);
console.log(`> Press ${'CTRL+C'.bold} to stop the server`);

// open web browser
opn(url);
