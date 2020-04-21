const path = require('path');
const autoprefixer = require('autoprefixer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, args) => {
    let production = false;

    if (args && args.mode === 'production') {
        production = true;
        console.log('== Production mode');
    } else {
        console.log('== Development mode');
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
                        {loader: "style-loader"},
                        {loader: "@teamsupercell/typings-for-css-modules-loader"},
                        {loader: "css-loader", options: {modules: true, importLoaders: 1}},
                        {loader: "postcss-loader", options: { plugins: [ autoprefixer() ],}},
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {loader: 'url-loader', options: {limit: 8192,}},
                    ],
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
            filename: 'app.js',
            path: path.resolve(__dirname, 'dist'),
        },
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 4200,
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin(),
            new CopyWebpackPlugin([
                // static files to the site root folder (index and robots)
                {
                    from: './src/static/**/*',
                    to: path.resolve('./dist/'),
                    toType: 'dir',
                    flatten: true
                },
            ]),
        ]
    }

};
