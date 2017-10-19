import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux';
import parkingApp from '../src/reducers/index';
import Root from './Root';

//both these files found in node_modules
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';

var store = createStore(parkingApp);

import registerServiceWorker from './registerServiceWorker';



render(
  <Root store={store} />,
  document.getElementById('root')
);

registerServiceWorker();
