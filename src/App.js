import React, { Component } from 'react';

import Nav from './components/custom/Nav';
import Invader from './components/custom/Invader';


class App extends Component {
  render() {
    return (
      <div className ="appContainer">
        <Nav/>
        <Invader/>
      </div>
    );
  }
}
//
export default App;
