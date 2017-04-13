import HtmlWebpackPlugin from 'html-webpack-plugin';
import { NamedModulesPlugin } from 'webpack';
import paths from './paths';

// base configuration
const config = {

    // base directory
    context: paths.context,

    // application entry filename
    entry: {
        app: [
            paths.entry
        ]
    },

    // output configuration
    output: {
        path: paths.build,
        filename: 'bundle.js'
    },

    // configure module loaders
    module: {
        rules: [

            // add support for loading html files
            {
                include: [
                    paths.src
                ],
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                }],
            },

            // add support loading media files
            {
    			test: /\.(gif|png|jpe?g|svg)$/,
                include: [
                    paths.gfx
                ],
    			loaders: [
    				{
    					loader: 'file-loader',
    					query: {
                        	hash: 'sha512',
                        	digest: 'hex',
                        	name: process.env.NODE_ENV === 'production' ? 'static/gfx/[name].[hash:8].[ext]' : '[path][name].[ext]',
                        },
    				},
    				{
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
    				},
    			],
    		},

            // add support for loading sass files
            {
                test: /\.scss$/,
                include: [
                    paths.gfx
                ],
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            }
        ]
    },

    // configure plugins
    plugins: [
        // use actual module names not just ids
        new NamedModulesPlugin(),

        // generate the index html file
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: paths.indexHtml
        })
    ],

    // generate source-maps
    // devtool: 'source-map',
};

export default config;
