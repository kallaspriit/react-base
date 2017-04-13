/* eslint-disable no-console */

import webpack from 'webpack';
import 'colors';
import webpackConfig from '../webpack/webpack.build';
import paths from '../../config/paths';

// create compiler
const compiler = webpack(webpackConfig);
const startTime = Date.now();

// run the compiler generating production build
compiler.run((error, _stats) => {
	if (error) {
		console.log('FAILED'.red);
		console.error(error);

		return;
	}

	const timeTaken = Date.now() - startTime;

	console.log(`${'Static application ready'.green} in ${timeTaken}ms (output directory: ${paths.dist.bold})`);
	console.log('');
});
