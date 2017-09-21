const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const config = {
	devtool: '#source-map',
	watch: true,
	entry: './src/view',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'view.bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				options: {
					includePaths: ['src'],
				},
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin
					.extract({
						fallbackLoader: 'style',
						loader: 'css?sourceMap!sass?sourceMap',
						options: {
							includePaths: ['src/view/scss'],
						},
					}),
			},
		],
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: { baseDir: ['dist'] }
		}),
		new webpack.optimize.CommonsChunkPlugin
			('vendors.js'),
	]
};

module.exports = config;
