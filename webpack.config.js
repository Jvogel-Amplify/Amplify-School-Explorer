const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const SRC_DIR = path.join(__dirname, 'frontend/src')
const DIST_DIR = path.join(__dirname, 'frontend/dist')
const LIBRARY_DIR = path.join(__dirname, 'library')

console.log(`Using library located here: ${LIBRARY_DIR}`)

module.exports = {
    entry: {
        'main': `${SRC_DIR}/index.js`,
        // 'mapsAPI': `${SRC_DIR}/mapsAPI.js`,
    },
    output: {
        filename: '[name].js',
        path: DIST_DIR
    },
    mode: 'development',
    devtool: 'eval-source-map',
    watch: true,
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /(node_modules)/,
                resolve: {
                  extensions: ['.js', '.jsx']
                },
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      hmr: process.env.NODE_ENV === 'development',
                    },
                  },
                  'css-loader',
                  'sass-loader',
                ],
              },
        ],
    },
    resolve: {
        alias: {
            'lib': LIBRARY_DIR
        },
    },
    devServer: {
        port: 8000,
        contentBase: './frontend/dist',
        watchContentBase: true,
        hot: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
          }),
        new HtmlWebpackPlugin({
            template: path.join(SRC_DIR, 'index.html'),
            chunksSortMode: function (a, b) {  //alphabetical order
                if (a.names[0] > b.names[0]) {
                  return 1;
                }
                if (a.names[0] < b.names[0]) {
                  return -1;
                }
                return 0;
              }
        }),
        new CopyWebpackPlugin(
            [
                {
                    from: './frontend/src/fonts',
                    to: `${DIST_DIR}/fonts`,
                    toType: 'dir',
                },
                {
                    from: './frontend/src/data',
                    to: `${DIST_DIR}/data`,
                    toType: 'dir',
                },
            ],
        ),
        
    ],
};