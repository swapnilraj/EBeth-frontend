/**
 * Webpack configuration to build the project
 */

'use strict';

const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackHashOutput = require('webpack-plugin-hash-output');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { version } = require('./package.json');

const srcDir = resolve(__dirname, 'src');
const distDir = resolve(__dirname, 'dist');

module.exports = env => {
  const isProd = !!env.prod;
  const isStaging = !!env.staging;
  const isProdOrStaging = isProd || isStaging;

  const addPlugin = (add, plugin) => (add ? plugin : undefined);
  const removeEmpty = plugins => plugins.filter(plugin => !!plugin);
  const ifProd = plugin => addPlugin(isProdOrStaging, plugin);

  const output = {
    path: distDir,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  };

  if (isProdOrStaging) {
    Object.assign(output, {
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[hash].js',
    });
  }

  return {
    entry: {
      vendor: [
        'csstips',
        'react',
        'react-dom',
        'react-redux',
        'react-router',
        'redux',
        'redux-observable',

        // Directly referenced Rx paackages
        'rxjs/observable/dom/ajax',
        'rxjs/observable/of',
        'rxjs/observable/fromEvent',
        'rxjs/observable/merge',
        'rxjs/observable/concat',

        // Rx Packages referenced by patch files
        'rxjs/add/operator/catch',
        'rxjs/add/operator/debounceTime',
        'rxjs/add/operator/do',
        'rxjs/add/operator/filter',
        'rxjs/add/operator/map',
        'rxjs/add/operator/mergeMap',
        'rxjs/add/operator/switchMap',
        'rxjs/add/operator/takeUntil',
        'rxjs/add/operator/throttleTime',
        'typestyle',
      ],
      app: './index.tsx',
    },
    output,
    context: srcDir,
    devServer: {
      historyApiFallback: true,
    },
    devtool: isProdOrStaging ? 'source-map' : 'eval',
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
    },
    plugins: removeEmpty([
      new CleanWebpackPlugin('./dist'),
      new CopyWebpackPlugin([{ from: '../public' }]),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest', 'app'],
        minChunks: Infinity,
      }),
      new webpack.HashedModuleIdsPlugin(),
      new WebpackHashOutput({
        manifestFiles: 'vendor',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: isProdOrStaging ? '"production"' : '"development"',
          // Error logging
          APP_VERSION: `'${version}'`,
          IN_BROWSER: '"true"',
        },
      }),
      ifProd(
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false,
        }),
      ),
      ifProd(
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true,
            warnings: false,
          },
        }),
      ),
      new HtmlWebpackPlugin({ template: '../public/index.html' }),
      ifProd(
        new WorkboxPlugin({
          globDirectory: distDir,
          globPatterns: ['**/*.{html,js,css,svg}'],
          swDest: resolve(distDir, 'sw.js'),
          clientsClaim: true,
          skipWaiting: true,
        }),
      ),
      ifProd(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: true,
        }),
      ),
    ]),
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                plugins: ['transform-class-properties', 'transform-object-assign'],
                presets: ['env'],
              },
            },
            'ts-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          use: [{ loader: 'url-loader?limit=100000' }],
        },
      ],
    },
  };
};
