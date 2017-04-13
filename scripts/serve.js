import serve from 'serve';
import path from 'path';
import opn from 'opn';
import colors from 'colors';
import paths from '../config/paths';

const buildPath = path.join(__dirname, '..', 'build');
const port = 80; // TODO make configurable

// serve the static application
serve(buildPath, {
	port,
	single: true,
	silent: true,
});

// provide some help
console.log('Serving the application'.green + ' on ' + `http://localhost:${port}`.bold);
console.log(`> The pre-built application is served from ${paths.build.bold}`);
console.log(`> This is a static application server. For development with hot-reload use ${'> npm run dev'.bold}`);
console.log(`> Press ${'CTRL+C'.bold} to stop the server`);

// open web browser
opn('http://localhost' + (port !== 80 ? ':' + port : ''));
