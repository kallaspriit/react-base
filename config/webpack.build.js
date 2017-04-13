import { DefinePlugin } from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import base from './webpack.base';

// clone the base config
const config = {
    ...base
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
		'process.env.NODE_ENV': 'production'
    }),

	// add plugin to extract
	new ExtractTextWebpackPlugin({
		filename: 'bundle.css',
	}),
);

// overwrite the use parameter for css rule to extract css
config.module.rules = config.module.rules.map(rule => {
	// only modify the sass (scss) rule
	if (rule.test.toString().indexOf('.scss') === -1) {
		return rule;
	}

	// add the extracter
	rule.use = ExtractTextWebpackPlugin.extract({
		fallback: 'style-loader',
		use: rule.use.filter(rule => rule.loader !== 'style-loader').map(rule => rule.loader)
	});

	return rule;
});

export default config;
