import * as express from 'express';
import * as fs from 'fs';
import * as webpack from 'webpack';
import * as webpackMiddleware from 'webpack-dev-middleware';
import * as HMR from 'webpack-hot-middleware';
const bodyParser = require('body-parser');
const webpackConfig = require('../../webpack.config.client');
const config = require('./DBconfig');

const app = express();

app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let port = process.env.PORT || 3000;

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler));
app.use(HMR(compiler));

app.get('/', (_req, res) => {
  const index = fs.readFileSync('./public/index.html', 'utf-8');
  res.send(index);
});

app.listen(port, () => {
  console.log('app listening on 3000');
});