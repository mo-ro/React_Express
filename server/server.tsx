import * as express from 'express';
import * as fs from 'fs';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import HMR from 'webpack-hot-middleware';
const webpackConfig = require('../webpack.config.client');


const app = express();

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler));
app.use(HMR(compiler));

app.get('/', (req, res)=>{
  const index = fs.readFileSync('./public/index.html', 'utf-8');
  res.send(index);
});

app.listen(3000, ()=>{
  console.log('app listening on 3000');
});