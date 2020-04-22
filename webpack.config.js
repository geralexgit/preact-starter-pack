const webpack = require("webpack");

const path = require('path');
const autoprefixer = require('autoprefixer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, args) => {
    let production = false;
    const devEnv = args.mode === 'production' ? 'prod' : 'dev';
    if (args && args.mode === 'production') {
        production = true;
        console.log('== Production mode')
    } else {
        console.log('== Development mode')
    }

    return {
        entry: './src/index.tsx',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: '@teamsupercell/typings-for-css-modules-loader' },
                        {
                            loader: 'css-loader',
                            options: { modules: true, importLoaders: 1 },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['ie >= 8', 'last 4 version'],
                                    }),
                                ],
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [{ loader: 'url-loader', options: { limit: 8192 } }],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'app.js?[hash]',
            path: path.resolve(__dirname, 'dist'),
        },
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 4200,
        },

        optimization: {
            splitChunks: {
                chunks: 'async',
                minChunks: 2,
            },
            minimize: production,
            // minimizer: [
            //     new UglifyJsPlugin({
            //         parallel: true,
            //         sourceMap: false,
            //     }),
            // ],
        },

        plugins: [
            new ForkTsCheckerWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(devEnv),
                },
                PROJECT_ENV: JSON.stringify(devEnv),
            }),
            new CopyWebpackPlugin([
                // static files to the site root folder (index and robots)
                {
                    from: './src/static/**/*',
                    to: path.resolve('./dist/'),
                    toType: 'dir',
                    flatten: true,
                },
            ]),
        ],
    }
};
