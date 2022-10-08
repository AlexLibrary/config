const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    watch: true,
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      filename: '[name].[contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(s(a|c)ss)$/,
          use: [
            'style-loader', // creates style nodes from JS strings
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader', // post process the compiled CSS
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
            // MiniCssExtractPlugin.loader,
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
          use: {
            loader: 'url-loader',
          },
        }
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      open: true,
      hot: true,
      port: 3000,
      watchFiles: {
        paths: ['src/**/*.html'],
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        template: './src/index.html',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin(),
    ]
};