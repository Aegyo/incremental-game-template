const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        app: './src/index.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Production',
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
