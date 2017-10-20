import React, { Component } from 'react';

import { Button, Navbar, NavbarBrand, NavbarNav, NavbarToggler, NavItem} from 'mdbreact';
import Routes from '../../../mdbReactdocs/Routes';
import Register from './Register';
import Login from './Login';
import '../../style/style.css';

//Nav Component
class Nav extends Component {
  //two lines below are part of most every React component that has its own state. "constructor" is a specific to es6 classes and "super" allows this class to access methods of its parent class (which is the React Component class)
  constructor(props) {
    super(props);

    //login, register, and mobileNavOptions are used for toggling modal and nav views. backdrop is an mdb bootstrap thing
    this.state = {
      login: false,
      register: false,
      backdrop: false,
      mobileNavOptions: false
    };

    //binds the function to the component. Without these bindings 'this' would not have the proper reference
    this.toggleRegister = this.toggleRegister.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleMobileNav = this.toggleMobileNav.bind(this);

  }

  //opens and closes registration modal
  toggleRegister() {
    this.setState({
      register: !this.state.register
    });
  }

  //opens and closes login modal
  toggleLogin() {
    this.setState({
      login: !this.state.login
    });
  }

  //Exapnds and collapses the mobile-view nav. This will only open when hamburger is clicked.
  toggleMobileNav(e) {
    e.preventDefault();
    this.setState({
      mobileNavOptions: !this.state.mobileNavOptions
    });
  }


  render() {
    return (
      <div className="flyout">
        <Navbar color="black" dark expand="md" onBlur={this.toggleMobileNav}>
          <NavbarBrand href="/">Space Invaderz</NavbarBrand>
          <NavbarToggler onClick={this.toggleMobileNav}/>
          <ul className="dropdown-menu" style={{display: this.state.mobileNavOptions ? 'block' : 'none'}}>
            <li className ="navList" onClick={this.toggleLogin}><b>Login</b></li>
            <li className ="navList" onClick={this.toggleRegister}><b>Register</b></li>
          </ul>
          <div className="collapse navbar-collapse" id="reactNavbar">
            <NavbarNav className="ml-auto">
              <NavItem>
                <Button onClick={this.toggleLogin}>Login</Button>
              </NavItem>
              <NavItem>
                <Button onClick={this.toggleRegister}>Register</Button>
              </NavItem>
            </NavbarNav>
          </div>
        </Navbar>
        <Routes />
        <Register isOpen = {this.state.register} toggle={this.toggleRegister} backdrop ="static"/>
        <Login isOpen = {this.state.login} toggle={this.toggleLogin} backdrop ="static"/>
      </div>
    );
  }
}

export default Nav;
