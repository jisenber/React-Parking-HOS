import React, { Component } from 'react';

import Nav from './components/custom/Nav';
import Invader from './components/custom/Invader';
import Add from './components/custom/Add'

import CarList from './components/custom/CarList';

class App extends Component {
  render() {
    return (
      <div className ="appContainer">
        <Nav/>
        <Invader/>
        <Add/>
        <CarList/>
      </div>
    );
  }
}
//
export default App;
