import React, { Component } from 'react';

import { Button, Navbar, NavbarBrand, NavbarNav, NavbarToggler, NavItem} from 'mdbreact';
import onClickOutside from 'react-onclickoutside'; //vendor package to help with hiding the mobile nav when displayed
import Register from './Register';
import Login from './Login';
import Add from './Add';
import {toggleModal, toggleLoginModal} from '../../actions/modal.js';
import {store} from '../../index.js';
import {connect} from 'react-redux';
import '../../style/style.css';

//Nav Component
class Nav extends Component {
  //two lines below are part of most every React component that has its own state. "constructor" is a specific to es6 classes and "super" allows this class to access methods of its parent class (which is the React Component class)
  constructor(props) {
    super(props);

    //login, register, and mobileNavOptions are used for toggling modal and nav views. backdrop is an mdb bootstrap thing
    this.state = {
      // login: false,
      register: false,
      backdrop: false,
      add: false,
      mobileNavOptions: false
    };

    //binds the function to the component. Without these bindings 'this' would not have the proper reference
    this.toggleRegister = this.toggleRegister.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleMobileNav = this.toggleMobileNav.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);

  }


  handleClickOutside() {
    this.setState ({
      mobileNavOptions: false,
    });
  }

  //opens and closes registration modal
  toggleRegister() {
    this.setState({
      register: !this.state.register
    });
  }

  //opens and closes login modal
  toggleLogin() {
    const state = store.getState();
    this.props.toggleLoginModal(state.toggleLoginModal);
    console.log('getting Login State', state);
    // this.setState({
    //   login: !this.state.login
    // });
  }

  //opens and closes Add modal
  toggleAdd(e) {
    if(!e) return;
    e.preventDefault();
    this.setState({
      login: false,
      register: false
    });
    const state = store.getState();
    this.props.toggleModal(state.toggleModal);
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
        <Navbar color="black" dark expand="md">
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
        <Register isOpen = {this.state.register} toggle={this.toggleRegister} />
        <Login isOpen = {this.props.canViewLoginModal} toggle={this.toggleLogin} openLogin={this.toggleRegister}/>
        <Add isOpen = {this.props.canViewAddModal} toggle={this.toggleAdd} modalOpen="true"/>
        <div className="fab">
          <Button onClick={this.toggleAdd} className="btn btn-floating btn-large red" id="postButton">
          <i className="fa fa-plus"></i>
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    canViewAddModal: state.toggleModal,
    canViewLoginModal: state.toggleLoginModal
  };
};

//same as above that this method is for react-redux. Maps the dispatch action to a component's props. That's why you can call this.props.fetchData()
const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal : (bool) => dispatch(toggleModal(bool)),
    toggleLoginModal : (bool) => dispatch(toggleLoginModal(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

//export default onClickOutside(Nav);
