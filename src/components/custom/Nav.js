import React, { Component } from 'react';
import { Button, Navbar, NavbarBrand, NavbarNav, NavbarToggler, NavItem} from 'mdbreact';
import Register from './Register';
import Login from './Login';
import Add from './Add';
import {toggleModal, toggleLoginModal, toggleRegisterModal} from '../../actions/modal.js';
import {isLoggedIn} from '../../actions/auth.js';
import {setCurrentUser} from '../../actions/register.js';
import {store} from '../../index.js';
import {connect} from 'react-redux';
import '../../style/style.css';

//Nav Component
class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileNavOptions: false
    };

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

  // componentWillMount() {
  //   const state = store.getState();
  //   if (state.userRegistrationHandler.user) {
  //     this.props.isLoggedIn(true);
  //   }
  // }

  // componentDidMount() {
  //   this.props.checkCurrentUser(function(response) {
  //     console.log('here is the response from the component', response);
  //   });
  // }

  //opens and closes registration modal
  toggleRegister() {
    const state = store.getState();
    this.props.toggleRegisterModal(state.toggleModal.canViewRegisterModal);
  }

  //opens and closes login modal
  toggleLogin() {
    const state = store.getState();
    this.props.toggleLoginModal(state.toggleModal.canViewLoginModal);
  }

  //opens and closes Add modal
  toggleAdd(e) {
    if(!e) return;
    e.preventDefault();
    const state = store.getState();
    this.props.toggleModal(state.toggleModal.canViewAddModal);
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
        <Register isOpen = {this.props.canViewRegisterModal} toggle={this.toggleRegister} />
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
    canViewAddModal: state.toggleModal.canViewAddModal,
    canViewLoginModal: state.toggleModal.canViewLoginModal,
    canViewRegisterModal: state.toggleModal.canViewRegisterModal
  };
};

//same as above that this method is for react-redux. Maps the dispatch action to a component's props. That's why you can call this.props.fetchData()
const mapDispatchToProps = (dispatch) => {
  return {
    //isLoggedIn : (bool) => dispatch(isLoggedIn(bool)),
    toggleModal : (bool) => dispatch(toggleModal(bool)),
    toggleLoginModal : (bool) => dispatch(toggleLoginModal(bool)),
    toggleRegisterModal : (bool) => dispatch(toggleRegisterModal(bool)),
    setCurrentUser : (username) => dispatch(setCurrentUser(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

//export default onClickOutside(Nav);
