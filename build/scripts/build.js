import webpack from 'webpack';
import { Spinner } from 'cli-spinner';
import 'colors';
import { generateViewsIndex } from '../services/indexer';
import reportWebpackStats from '../services/webpack-stats-reporter';
import webpackConfig from '../webpack/webpack.build';
import paths from '../../build/paths';

// create compiler
const compiler = webpack(webpackConfig);
const startTime = Date.now();

// generate the views index
generateViewsIndex((viewIndexError, _wasIndexChanged) => {
	if (viewIndexError) {
		console.error(`generating views index failed (${viewIndexError})`);

		return;
	}

	const spinner = new Spinner('Building, please wait..');
	spinner.setSpinnerString(19);
	spinner.start();

	// run the compiler generating production build
	compiler.run((compilerError, stats) => {
		spinner.stop(true);

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

		console.log(`${' BUILD COMPLETE '.bgGreen.black} in ${timeTaken}ms (output directory: ${paths.dist.bold})`);
		console.log(`run ${'> npm run serve'.bold} to serve the generated static application`);
		console.log('');
	});
});
