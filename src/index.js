import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import App from './App';
//import Root from './Root';

//both these files found in node_modules
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';

export const store = configureStore();

render(
  <Provider store = {store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
