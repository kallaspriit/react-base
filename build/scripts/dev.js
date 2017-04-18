/* eslint-disable no-console */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Spinner } from 'cli-spinner';
import { watch } from 'chokidar';
import opn from 'opn';
import 'colors';
import startDevServer from '../services/dev-server';
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

	// open web browser on first done event
	if (isFirstDone) {
		const indexUrl = `http://localhost${serverConfig.port !== 80 ? `:${serverConfig.port}` : ''}/`;

		console.log(`server at ${indexUrl.bold} was started in ${compileTimeTaken}ms`);

		// start a development server in the background
		startDevServer();

		// watch for view file changes and regenerate the index
		const watcher = watch(paths.views, {
			ignoreInitial: true,
		});

		// regenerate views index if the changed file is in views directory
		watcher.on('addDir', (_path) => {
			// console.log(`${path.bold} was added, regenerating index`);

			generateViewsIndex();
		});
		watcher.on('unlinkDir', (_path) => {
			// console.log(`${path.bold} was removed, regenerating index`);

			generateViewsIndex();
		});

		// open in browser
		opn(indexUrl);

		isFirstDone = false;
	} else {
		console.log(`${' UPDATED '.bgGreen.black} in ${compileTimeTaken}ms`);
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
