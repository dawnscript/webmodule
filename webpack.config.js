const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/script/script.js',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist/script'),
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            filename: '../index.html',
        }),
    ],
    module: {
        rules: [
            {
              test: /\.js$/, 
              exclude: /node_modules|dist/, 
              use: {
                loader: 'babel-loader', 
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            }
        ],
    },
}