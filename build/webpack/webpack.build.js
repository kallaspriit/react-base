import webpack, { DefinePlugin } from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import base from './webpack.base';

// clone the base config
const config = {
	...base,
};

// utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
config.output = {
	...config.output,
	filename: '[name].[hash:8].js',
};

// add production-specific plugins
config.plugins.unshift(

	// add plugin to clean the output folder
	new CleanWebpackPlugin([
		config.output.path,
	], {
		root: config.context,
		verbose: false,
	}),

	// add the environment define plugin
	new DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production'),
	}),

	// set loader options
	new webpack.LoaderOptionsPlugin({
		minimize: true,
		debug: false,
	}),

	// optimize output
	new webpack.optimize.UglifyJsPlugin({
		sourceMap: 'cheap-module-source-map',
	}),
);

export default config;
