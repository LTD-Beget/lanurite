let webpack = require("webpack");
let TypedocWebpackPlugin = require('typedoc-webpack-plugin');

module.exports = {
    entry: './source/lanurite.ts',
    output: {
        libraryTarget: "umd",
        library: "Lanurite",
        filename: './dist/lanurite.js'
    },
    target: "node",
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', ".js"],
        modules: ["src", "node_modules"]
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(require("./package.json").version),
        }),
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new TypedocWebpackPlugin({
            out: './docs',
            module: 'umd',
            exclude: '**/node_modules/**/*.*',
            experimentalDecorators: true,
            excludeExternals: true
        }, './src')
    ]
};

