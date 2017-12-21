import React, { Component } from 'react';

import Nav from './components/custom/Nav';
import Invader from './components/custom/Invader';
import Add from './components/custom/Add';
import CarList from './components/custom/CarList';
import Search from './components/custom/Search';

class App extends Component {
  render() {
    return (
      <div className ="appContainer">
        <Nav/>
        <Invader/>
        <Add/>
        <CarList/>
        <Search/>
      </div>
    );
  }
}
//
export default App;
