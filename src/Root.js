import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';

//<Provider/> is the higher-order component provided by React Redux that lets you bind React to Redux
//want to wrap Router in Provider so routes can access the store
const Root = ({ store }) => (
  <Provider store = {store}>
    <Router>
      <div>
        <Route exact path="/" component={App}/>
      </div>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
