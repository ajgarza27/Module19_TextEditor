const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: path.resolve(__dirname, 'src/js/index.js'), 
      install: path.resolve(__dirname, 'src/js/install.js'),
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        title: 'Text Editor',
      }),
      new InjectManifest({
        swSrc: path.resolve(__dirname, 'src-sw.js'),
        swDest: 'service-worker.js',
      }),
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'TextEditor',
        description: 'A simple text editor',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: '.',
        publicPath: '.',
        icons: [
          {
            src: path.resolve(__dirname, 'src/images/logo.png'), 
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'favicon.ico'), to: path.resolve(__dirname, 'dist') }
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
      ],
    },
  };
};