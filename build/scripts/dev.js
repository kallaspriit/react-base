/* eslint-disable no-console */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Spinner } from 'cli-spinner';
import 'colors';
import startDevServer from '../services/dev-server';
import watch from '../services/file-watcher';
import { generateViewsIndex } from '../services/indexer';
import reportWebpackStats from '../services/webpack-stats-reporter';
import webpackConfig from '../webpack/webpack.dev';
import paths from '../../config/paths';

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
	historyApiFallback: {
		index: 'index.html',
	},
};

// setup compiler and dev server
const compiler = webpack(webpackConfig);
const devServer = new WebpackDevServer(compiler, serverConfig);

// configure compiler
let compileStartTime = Date.now();
let isFirstDone = true;

// setup spinner
const spinner = new Spinner('Please wait..');
spinner.setSpinnerString(19);

// called when the compiler starts compiling
compiler.plugin('compile', (_params) => {
	compileStartTime = Date.now();

	spinner.setSpinnerTitle('Updating, please wait..');
	spinner.start();
});

// called when compiler finishes update
compiler.plugin('done', (stats) => {
	spinner.stop(true);

	reportWebpackStats(stats);

	if (stats.hasErrors()) {
		return;
	}

	const compileTimeTaken = Date.now() - compileStartTime;

	console.log(`${' UPDATED '.bgGreen.black} in ${compileTimeTaken}ms`);

	// open web browser on first done event
	if (isFirstDone) {
		const indexUrl = `http://localhost${serverConfig.port !== 80 ? `:${serverConfig.port}` : ''}`;

		console.log(`development server started at ${indexUrl.bold}`);

		// start a development server in the background
		startDevServer();

		// watch for JS file changes
		watch(`${paths.src}/**/*.js`, (event, filepath) => {
			// console.log(`${filepath.bold} was ${event.bold}`);

			// regenerate views index if the changed file is in views directory
			if (filepath.indexOf(paths.views) !== -1) {
				generateViewsIndex();
			}
		});

		isFirstDone = false;
	}
});

// called when compiling fails hard
compiler.plugin('failed', (error) => {
	console.error(`${' FAILED '.bgRed.black} -${error}`);
});

// generate indexes
generateViewsIndex();

// start the dev server on given port
devServer.listen(serverConfig.port, serverConfig.host, () => {
	console.log('');
	// console.log('-- Starting development server --'.bold);

	spinner.setSpinnerTitle('Starting development server, please wait..'.bold);
	spinner.start();
});
