const merge = require('webpack-merge');
const parts = require('./config/webpack/webpack.parts');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = require('./config/webpack/paths')({dir: __dirname});
const developConfig = require('./config/webpack/webpack.dev');
const productionConfig = require('./config/webpack/webpack.prod');

// Update project title here
const title = 'Water Quality';

const commonConfig = merge([
    {
        entry: PATHS.app,
        plugins: [
            new HtmlWebpackPlugin({
                template: PATHS.template,
                title: title,
                xhtml: true
            })
        ]
    },
    parts.loadJavaScript({include: PATHS.app, exclude: /(node_modules)/}),
    parts.loadImages(),
    parts.loadFonts()
]);

module.exports = function(env) {
    if (env === 'production') {
        return merge(commonConfig, productionConfig);
    }
    return merge(commonConfig, developConfig);
};