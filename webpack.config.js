const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src');
const dirAssets = path.join(__dirname, 'assets');
const dirStyles = path.join(__dirname, 'src', 'styles');

/**
 * Webpack Configuration
 */
module.exports = {
	entry: {
		bundle: path.join(dirApp, 'index')
	},
	resolve: {
		modules: [
			dirNode,
			dirApp,
			dirAssets,
			dirStyles
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			IS_DEV: true
		}),

		new HtmlWebpackPlugin({
			filename: path.join(dirApp, 'index.html')
		})
	],
	module: {
		rules: [
			{
				test: /\.js|jsx$/,
				loader: 'babel-loader',
				exclude: /(node_modules)/,
				options: {
					compact: true
				}
			},

			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
				]
			},
			{
				test: /\.scss/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							includePaths: [dirStyles]
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
			}
		]
	}
};
