const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const path = require('path');
const PATHS = require('./paths')({dir: path.join(__dirname, '../../')});

module.exports = merge([
    parts.prod,
    parts.output({path: PATHS.build}),
    parts.extractCss({
        use: [
            'css-loader',
            'sass-loader',
            parts.autoprefix()
        ]
    }),
    parts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true,
            },
            // Run cssnano in safe mode to avoid
            // potentially unsafe transformations.
            safe: true,
        },
    }),
    parts.minifyJavaScript(),
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
    parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
    )
]);