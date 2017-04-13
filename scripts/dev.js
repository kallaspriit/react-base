/* eslint-disable no-console */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import 'colors';
import opn from 'opn';
import webpackConfig from '../config/webpack.dev';

// dev server configuration
const serverConfig = {
	hot: true,
	overlay: {
		warnings: true,
		errors: true,
	},
	stats: {
		colors: true,
	},
	quiet: true,
	noInfo: true,
	host: '0.0.0.0',
	port: 3000,
};

// setup compiler and dev server
const compiler = webpack(webpackConfig);
const devServer = new WebpackDevServer(compiler, serverConfig);

// configure compiler
let compileStartTime = Date.now();
let isFirstDone = true;

// called when the compiler starts compiling
compiler.plugin('compile', (_params) => {
	compileStartTime = Date.now();

	// process.stdout.write('compiling.. ');
});

// called when compiler finishes update
compiler.plugin('done', (stats) => {
	const compileTimeTaken = Date.now() - compileStartTime;
	const info = stats.toJson();

	if (stats.hasErrors()) {
		console.log(`${'GOT ERRORS'.red} in ${compileTimeTaken}ms`);

		info.errors.forEach((message) => {
			const lines = message.split(/\n/);

			console.error(lines[0].red);
			console.error(lines.splice(1).map(line => `> ${line}`).join('\n'));
			console.log('');
		});
	} else if (stats.hasWarnings()) {
		console.log(`${'GOT WARNINGS'.yellow} in ${compileTimeTaken}ms`);

		info.warnings.forEach((message) => {
			const lines = message.split(/\n/);

			console.error(lines[0].yellow);
			console.error(lines.splice(1).map(line => `> ${line}`).join('\n'));
			console.log('');
		});
	} else {
		console.log(`${'UPDATED'.green} in ${compileTimeTaken}ms`);
	}

	// open web browser on first done event
	if (isFirstDone) {
		const indexUrl = `http://localhost${serverConfig.port !== 80 ? `:${serverConfig.port}` : ''}`;

		console.log(`Opening development server ${indexUrl.bold}`);

		opn(indexUrl);

		isFirstDone = false;
	}
});

// called when compiling fails hard
compiler.plugin('failed', (error) => {
	console.error(`${'FAILED'.red} (${error})`);
});

// start the dev server on given port
devServer.listen(serverConfig.port, serverConfig.host, () => {
	console.log('');
	console.log('-- Starting development server --'.underline);
});
