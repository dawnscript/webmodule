const path = require('path');

module.exports = {
    entry: './src/script/script.js',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist/script'),
    },
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
        ],
    },
}