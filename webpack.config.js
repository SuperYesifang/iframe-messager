const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "production",
	entry: {
		cdn: "./src/index.cdn.js"
	},
	output: {
		path: __dirname + "/dist",
		filename: "IframeMessager.[name].js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader"
			}
		]
	},
	devServer: {
		static: {
			directory: __dirname + "dist",
			publicPath: "/dist"
		},
		host: "local-ip",
		port: 8080,
		compress: true,
		hot: true,
		open: {
			app: "Google Chrome"
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			hash: false,
			minify: false,
			inject: false
		}),
		new HtmlWebpackPlugin({
			template: "./src/child.html",
			filename: "child.html",
			hash: false,
			minify: false,
			inject: false
		})
	]
}