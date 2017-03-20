const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const path = require('path');
const PATHS = require('./paths')({dir: path.join(__dirname, '../../')});

module.exports = merge([
    {
        watch: true
    },
    parts.output({path: PATHS.build}),
    parts.generateSourcemaps({type: 'eval-source-map'}),
    parts.loadSass()
]);