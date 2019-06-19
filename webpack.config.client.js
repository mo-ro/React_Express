const path = require('path');
const webpack = require('webpack');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const postcssSort = require('postcss-sorting');

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
        test: /\.css$/,
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
                postcssPresetEnv ({
                  autoprefixer: { grid: true },
                  importFrom: './src/css/settings/variable.css',
                  features: {
                    stage: 3,
                    'nesting-rules': true
                  }
                }),
                cssnano ({
                  preset: 'default',
                }),
                postcssSort ({
                  propertiesOrder: 'alphabetical'
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