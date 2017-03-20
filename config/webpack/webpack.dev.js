const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const path = require('path');
const PATHS = require('./paths')({dir: path.join(__dirname, '../../')});

module.exports = merge([
    {
        watch: true
    },
    parts.output({path: PATHS.build}),
    parts.extractBundles([
        {
            name: 'vendor',
            minChunks: ({resource}) => (
                resource &&
                resource.indexOf('node_modules') >= 0 &&
                resource.match(/\.js$/)
            )
        }
    ]),
    parts.generateSourcemaps({type: 'eval-source-map'}),
    parts.loadSass()
]);