const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");

const postCssLoader = {
    loader: "postcss-loader",
    options: {
        sourceMap: false,
        plugins: [autoprefixer({
            remove: false,
            overrideBrowserslist: ["> 1%", "ie 10", "ie 11"]
        })]
    }
};

module.exports = {
    entry: "./src/view/index.tsx",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
        path: path.join(__dirname, "/build"),
        filename: "bundle.js"
    },
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            loader: "ts-loader"
        },
        {
            test: /\.scss$/,
      // Keep in mind that webpack executes the loaders from last to first i.e from right to left.
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                postCssLoader,
                "sass-loader" // compiles Sass to CSS
            ]
        }
        ]
    },
    devtool: "source-map",
    devServer: {
        stats: 'minimal',
        open: true,
        port:3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
};