import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import "./css/index.pcss";

const render = (_App) =>{
  ReactDOM.render(
    <_App />,
    document.getElementById('root')
  );
};

if(module.hot){
  module.hot.accept('./App', ()=>{
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

render(App);