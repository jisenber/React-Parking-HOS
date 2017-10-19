import React, { Component } from 'react';

import { Button, Navbar, NavbarBrand, NavbarNav, NavbarToggler, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbreact';
import Routes from '../../../mdbReactdocs/Routes';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      backdrop: false
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    console.log('will mount');
  }

  componentDidMount() {
    console.log('mounted');
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="flyout">
        <Navbar color="black" dark expand="md">
          <NavbarBrand href="/">Space Invaderz</NavbarBrand>
          <NavbarToggler />
          <div className="collapse navbar-collapse" id="reactNavbar">

            <NavbarNav className="ml-auto">
              <NavItem>
                <Button onClick={this.toggle}>Login/Register</Button>
              </NavItem>
            </NavbarNav>
          </div>
        </Navbar>
        <Routes />
        <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop="static">
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Nav
