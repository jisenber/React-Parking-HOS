import React, { Component } from 'react';

import Nav from './components/custom/Nav';
import Invader from './components/custom/Invader';
import Add from './components/custom/Add'


class App extends Component {
  render() {
    return (
      <div className ="appContainer">
        <Nav/>
        <Invader/>
        <Add/>
      </div>
    );
  }
}
//
export default App;
