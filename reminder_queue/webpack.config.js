const path = require("path");
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const dotenv = require("dotenv");
dotenv.config()

module.exports = {
	mode: process.env.MODE,
	entry: "./src/index.js",
	target: "node",
	experiments: {
		topLevelAwait: true
	},
	externals: [nodeExternals()],
	output: {
		filename: "server.bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new NodemonPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
			}
		]
	},
}