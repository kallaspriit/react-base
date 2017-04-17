import HtmlWebpackPlugin from 'html-webpack-plugin';
import { NamedModulesPlugin } from 'webpack';
import paths from '../../config/paths';

process.traceDeprecation = true;

// base configuration
const config = {

	// base directory
	context: paths.context,

	// application entry filename
	entry: {
		app: [
			'whatwg-fetch', // fetch polyfill - https://github.com/github/fetch
			paths.entry,
		],
	},

	// output configuration
	output: {
		path: paths.dist,
		filename: 'bundle.js',
	},

	// configure module loaders
	module: {
		rules: [

			// add support for loading js files with babel
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [{
					loader: 'babel-loader',
				}],
			},

			// add support loading media files
			{
				test: /\.(gif|png|jpe?g|svg)$/,
				include: [
					paths.gfx,
				],
				use: [{
					loader: 'file-loader',
					query: {
						hash: 'sha512',
						digest: 'hex',
						name: process.env.NODE_ENV === 'production'
							? 'static/gfx/[name].[hash:8].[ext]'
							: '[path][name].[ext]',
					},
				}, {
					loader: 'image-webpack-loader',
					query: {
						progressive: true,
						optipng: {
							optimizationLevel: 4,
						},
						gifsicle: {
							interlaced: false,
						},
						pngquant: {
							quality: '65-90',
							speed: 4,
						},
					},
				}],
			},

			// add support for loading sass files
			{
				test: /\.scss$/,
				include: [
					paths.gfx,
				],
				use: [{
					loader: 'style-loader',
				}, {
					loader: 'css-loader',
				}, {
					loader: 'sass-loader',
				}],
			},
		],
	},

	// configure plugins
	plugins: [
		// use actual module names not just ids
		new NamedModulesPlugin(),

		// generate the index html file
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: paths.indexHtml,
			inject: true,
		}),
	],
};

export default config;
