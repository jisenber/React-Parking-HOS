import React, { Component } from 'react';

import { Button, Navbar, NavbarBrand, NavbarNav, NavbarToggler, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbreact';
import Routes from '../../../mdbReactdocs/Routes';
import Register from './Register';
import Login from './Login';
import '../../style/style.css';

//Nav Component
class Nav extends Component {
  constructor(props) {
    super(props);

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

  //opens registration modal
  toggleRegister() {
    this.setState({
      register: !this.state.register
    });
  }

  //opens login modal
  toggleLogin() {
    this.setState({
      login: !this.state.login
    });
  }

  toggleMobileNav(e) {
    e.preventDefault()
    console.log('toggled');
    this.setState({
      mobileNavOptions: !this.state.mobileNavOptions
    });
  }


  render() {
    return (
      <div className="flyout">
        <Navbar color="black" dark expand="md">
          <NavbarBrand href="/">Space Invaderz</NavbarBrand>
          <NavbarToggler onClick={this.toggleMobileNav}/>
          <ul className="dropdown-menu"  style={{display: this.state.mobileNavOptions ? 'block' : 'none'}}>
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
