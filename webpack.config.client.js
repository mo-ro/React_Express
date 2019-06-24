const path = require('path');
const webpack = require('webpack');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const postcssSort = require('postcss-sorting');
const postcssImport = require('postcss-import');
const postcssCustomMedia = require('postcss-custom-media');

const MODE = 'development';
const enabledSourceMap = MODE === 'development';

module.exports = {
  mode: MODE,
  entry:[
    'webpack-hot-middleware/client',
    './src/index.tsx'
  ],
  output:{
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve:{
    extensions: ['.tsx', '.ts', '.js', 'json']
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ],
  module:{
    rules: [
      {
        loader: 'ts-loader',
        test: /\.tsx?$/,
        exclude: [
          /node_modules/
        ],
        options: {
          configFile: 'tsconfig.client.json'
        }
      },
      {
        test: /\.pcss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 1
            }
          },
          { 
            loader: 'postcss-loader', 
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssImport(),
                postcssCustomMedia(),
                cssnano ({
                  preset: 'default',
                }),
                postcssSort ({
                  propertiesOrder: 'alphabetical'
                }),
                postcssPresetEnv ({
                  autoprefixer: { grid: true },
                  importFrom: './src/frontend/css/index.pcss',
                  features: {
                    stage: 3,
                    'nesting-rules': true
                  }
                })
              ]
            } 
          }
        ]
      },
      {
        test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
        loader: 'url-loader'
      }
    ]
  }
};