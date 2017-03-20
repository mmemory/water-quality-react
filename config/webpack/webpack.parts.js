const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

exports.output = ({ path } = {}) => ({
    output: {
        path,
        filename: '[name].js'
    }
});

exports.loadJavaScript = ({ include, exclude }) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,

                loader: 'babel-loader',
                options: {
                    // Enable caching for improved performance during
                    // development.
                    // It uses default OS directory by default. If you need
                    // something more custom, pass a path to it.
                    // I.e., { cacheDirectory: '<path>' }
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                },
            },
        ],
    },
});

exports.loadSass = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,

                use: ['style-loader', 'css-loader', 'fast-sass-loader'],
            },
        ],
    },
});

exports.extractCss = ({ include, exclude, use }) => {
    // Output extracted CSS to a file
    const plugin = new ExtractTextPlugin({
        filename: '[name].css',
    });

    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include,
                    exclude,

                    use: plugin.extract({
                        use,
                        fallback: 'style-loader',
                    }),
                },
            ],
        },
        plugins: [ plugin ],
    };
};

exports.autoprefix = () => ({
    loader: 'postcss-loader',
    options: {
        plugins: () => ([
            require('autoprefixer'),
        ]),
    },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg)$/,
                include,
                exclude,

                use: {
                    loader: 'file-loader',
                    options,
                },
            },
        ],
    },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                // Capture eot, ttf, woff, and woff2
                test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                include,
                exclude,

                use: {
                    loader: 'file-loader',
                    options,
                },
            },
        ],
    },
});

exports.generateSourcemaps = ({ type } = {}) => ({
    devtool: type
});

exports.extractBundles = (bundles) => ({
    plugins: bundles.map((bundle) => (
        new webpack.optimize.CommonsChunkPlugin(bundle)
    )),
});

exports.minifyJavaScript = () => ({
    plugins: [
        new BabiliPlugin(),
    ],
});

exports.minifyCSS = ({ options }) => ({
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: options,
            canPrint: false,
        }),
    ],
});

exports.setFreeVariable = (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env),
        ],
    };
};