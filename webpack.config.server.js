const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src/server/server.ts',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [{
      loader: 'ts-loader',
      test: /\.tsx?$/,
      exclude: [
        /node_modules/
      ],
      options: {
        configFile: 'tsconfig.server.json'
      }
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'json']
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'public')
  }
};