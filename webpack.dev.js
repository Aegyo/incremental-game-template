const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const {EnvironmentPlugin} = require("webpack");

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',

    plugins: [
        new EnvironmentPlugin({
            DEBUG: true
        })
    ],
    devServer: {
        contentBase: './dist',
    }
});
