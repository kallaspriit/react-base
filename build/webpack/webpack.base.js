import { NamedModulesPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import paths from '../../config/paths';

// track depracated functionality
process.traceDeprecation = true;

// extracts stylesheet file (disabled in development mode)
const extractScss = new ExtractTextWebpackPlugin({
	filename: '[name].[contenthash:8].css',
	disable: process.env.NODE_ENV === 'development',
});

// configure postcss
const postCssOptions = {
	plugins: () => ([
		autoprefixer({
			browsers: [
				'>1%',
				'last 4 versions',
				'Firefox ESR',
				'not ie < 11',
			],
		}),
	]),
};

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
		publicPath: '/',
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

			// add support for loading sass files
			{
				test: /\.scss$/,
				include: [
					paths.gfx,
					paths.views,
					paths.components,
				],
				use: extractScss.extract({
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader', options: { sourceMap: true, importLoaders: 1, fixUrls: true } },
						{ loader: 'postcss-loader', options: postCssOptions },
						{ loader: 'sass-loader', query: { outputStyle: 'expanded' } },
					],
				}),
			},

			// add support for loading font files
			{
				test: /\.(ttf|woff|woff2)$/,
				loader: 'file-loader',
			},

			// add support loading media files
			{
				test: /\.(gif|png|jpe?g|)$/,
				include: [
					paths.gfx,
					paths.views,
					paths.components,
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

			// add support loading svg images
			{
				test: /\.svg$/,
				include: [
					paths.gfx,
					paths.views,
					paths.components,
				],
				use: [{
					loader: 'babel-loader',
				}, {
					loader: 'react-svg-loader',
				}],
			},

			// add support for loading markdown (.md) and text files (.txt) as a string
			{
				test: /\.md|\.txt$/,
				include: [
					paths.context,
				],
				use: [{
					loader: 'raw-loader',
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

		// this is disabled in development mode
		extractScss,
	],
};

export default config;
