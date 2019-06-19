import * as express from 'express';
// import * as fs from 'fs';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import webpack from 'webpack';
const webpackConfig = require('../webpack.config.dev.js');
import webpackMiddleware from 'webpack-dev-middleware';
import HMR from 'webpack-hot-middleware';

import App from '../src/App';
import routes from '../src/Routes/routes'
import { StaticRouter, matchPath } from "react-router-dom"
import { StaticRouterContext } from 'react-router';

// import { collectInitial } from 'node-style-loader/collect'
import "../src/scss/index.scss";

const app = express();

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler));
app.use(HMR(compiler));

//GETリクエストでルートにアクセスが会った時の動作
app.get('*', (req, res)=>{
  const activeRoute: any = routes.find((route) => matchPath(req.url, route)) || {};
  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  // let index = fs.readFileSync('./public/index.html', 'utf-8');
  // const appRendered = renderToString(
  //   <App />
  // );
  promise.then((data) => {
    const staticContext: StaticRouterContext = data
    // const initialStyleTag = collectInitial()
    const markup = renderToString(
      <StaticRouter location={req.url} context={staticContext}>
        <App />
      </StaticRouter>
    )
  // index = index.replace('<%= preloadedApplication %>', appRendered);
  // res.send(index);
  res.send(`
    <html>
      <head>
        <title>ssr</title>
        <link type="stylesheet" src="/style.css" />
      </head>
      <body>
        <div id="root">${markup}</div>
        <script src="/bundle.js" defer></script>
      </body>
    </html>
  `)
  });
});

//3000番ポートを使ってサーバーを立ち上げ
app.listen(3000, ()=>{
  console.log('app listening on 3000');
});