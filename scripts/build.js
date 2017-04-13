import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import colors from 'colors';
import webpackConfig from '../config/webpack.build';
import paths from '../config/paths';

// create compiler
const compiler = webpack(webpackConfig);
const startTime = Date.now();

// run the compiler generating production build
compiler.run((error, stats) => {
	if (error) {
		console.log('FAILED'.red);
		console.error(error);

		return;
	}

	const timeTaken = Date.now() - startTime;

	console.log('Static application ready'.green + ` in ${timeTaken}ms (output directory: ${paths.build.bold})`);
	console.log('');
})
