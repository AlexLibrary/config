const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => ({
    watch: argv.mode === 'development',
    entry: ['./src/index.html', './src/styles/styles.scss', './src/index.js'],
    output: {
      assetModuleFilename: "[name][ext]",
      publicPath: 'auto',
      filename: '[name].[contenthash].js',
      path: __dirname + '/dist',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          },
        },
        {
          test: /\.(s(a|c)ss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader', // post process the compiled CSS
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
          ],
          type: 'javascript/auto'
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/images/[hash][ext][query]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/fonts/[hash][ext][query]'
          }
        },
      ],
    },
    devServer: {
      open: true,
      hot: true,
      port: 3001,
      watchFiles: {
        paths: ['src/**/*'],
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        template: './src/index.html',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: "main.min.[hash].css"
      }),
    ]
});