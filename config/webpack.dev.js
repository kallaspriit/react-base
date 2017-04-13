import { HotModuleReplacementPlugin, DefinePlugin } from 'webpack';
import base from './webpack.base';

// clone the base config
const config = {
    ...base
};

// add development-specific plugins
config.plugins.unshift(
	// add the environment define plugin
	new DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('development')
    }),

	// add hot module replacement plugin
	new HotModuleReplacementPlugin()
);

// add hot reload entries
config.entry.app.unshift(
	'webpack-dev-server/client?http://localhost:3000',
	'webpack/hot/dev-server'
);

export default config;
