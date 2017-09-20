const path = require('path');

const config = {
	entry: './js/view',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'view.bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
			},
		],
	},
};

module.exports = config;
