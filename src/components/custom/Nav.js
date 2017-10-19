import React, { Component } from 'react';

import { Button, Navbar, NavbarBrand, NavbarNav, NavbarToggler, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbreact';
import Routes from '../../../mdbReactdocs/Routes';
import Register from './Register';
import Login from './Login';

//Nav Component
class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
      register: false,
      backdrop: false
    };

    this.toggleRegister = this.toggleRegister.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);

  }

  toggleRegister() {
    this.setState({
      register: !this.state.register
    });
  }

  toggleLogin() {
    this.setState({
      login: !this.state.login
    });
  }

  render() {
    return (
      <div className="flyout">
        <Navbar color="black" dark expand="md">
          <NavbarBrand href="/">Space Invaderz</NavbarBrand>
          <NavbarToggler/>
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
        <Modal isOpen={this.state.login} toggle={this.toggleLogin} backdrop="static">
          <ModalHeader toggle={this.toggle}>Login Modal</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Login</Button>{' '}
            <Button color="secondary" onClick={this.toggleLogin}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Register isOpen = {this.state.register} toggle={this.toggleRegister} backdrop ="static"/>
        <Login isOpen = {this.state.login} toggle={this.toggleLogin} backdrop ="static"/>
      </div>
    );
  }
}

export default Nav;
