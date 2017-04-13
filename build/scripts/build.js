/* eslint-disable no-console */

import webpack from 'webpack';
import 'colors';
import { generateViewsIndex } from '../services/indexer';
import reportWebpackStats from '../services/webpack-stats-reporter';
import webpackConfig from '../webpack/webpack.build';
import paths from '../../config/paths';

// create compiler
const compiler = webpack(webpackConfig);
const startTime = Date.now();

// generate the views index
generateViewsIndex((viewIndexError, _wasIndexChanged) => {
	if (viewIndexError) {
		console.error(`generating views index failed (${viewIndexError})`);

		return;
	}

	// run the compiler generating production build
	compiler.run((compilerError, stats) => {
		if (compilerError) {
			console.log('COMPILE FAILED'.red);
			console.error(compilerError);

			return;
		}

		reportWebpackStats(stats);

		if (stats.hasErrors()) {
			console.log('please fix errors and try again'.bold);

			return;
		}

		const timeTaken = Date.now() - startTime;

		console.log(`${' DONE '.bgGreen.black} in ${timeTaken}ms (output directory: ${paths.dist.bold})`);
		console.log(`run ${'> npm run serve'.bold} to serve the generated static application`);
		console.log('');
	});
});