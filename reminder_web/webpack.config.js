const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
    const config = {
        mode: env.mode,
        target: "web",
        entry: {
            client: "./src/index.js",
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
            publicPath: "",
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    loader: "babel-loader",
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: "url-loader",
                        },
                    ],
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                filename: "index.html",
                publicPath: "",
            }),
        ],
        resolve: {
            extensions: ["*", ".js", ".jsx"],
        },
    };

    return config;
};
