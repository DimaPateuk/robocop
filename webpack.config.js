const path = require('path');

const config = {
	entry: './src/view',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'view.bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				options: {
					includePaths: ['src'],
				},
			},
			{
				test: /\.scss$/,
				use: [{
					loader: 'style-loader',
				}, {
					loader: 'css-loader',
				}, {
					loader: 'sass-loader',
					options: {
						includePaths: ['src/view/scss'],
					},
				}],
			},
		],
	},
};

module.exports = config;
