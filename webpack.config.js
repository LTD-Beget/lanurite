let webpack = require("webpack");

module.exports = {
    entry: './src/lanurite.ts',
    output: {
        filename: './dist/lanurite.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'}
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(require("./package.json").version),
        })
    ]
};

