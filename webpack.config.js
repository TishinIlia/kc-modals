const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const mode = process.env.NODE_ENV || 'production'

module.exports = {
	mode,
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.[contenthash].js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(ts|tsx)$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
	},
	plugins: [
		new Dotenv({
			path: mode === 'production' ? './.env' : './.env.development',
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new StylelintWebpackPlugin({
			files: '{**/*,*}.css',
		}),
		new EslintWebpackPlugin({
			files: '{**/*,*}.{tsx,ts,js}',
		}),
	],
	devServer: {
		client: {
			overlay: false,
		},
		hot: true,
		open: true,
		historyApiFallback: true,
	},
}
