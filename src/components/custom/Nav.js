import React, { Component } from 'react';
import { Button, Navbar, NavbarBrand, NavbarNav, NavbarToggler, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'mdbreact';
import Register from './Register';
import Login from './Login';
import Add from './Add';
import Profile from './Profile';
import {toggleModal, toggleLoginModal, toggleRegisterModal, toggleProfile, fetchUserProfile, toggleDropdown} from '../../actions/modal.js';
import {isLoggedIn, logOut, loginUserSuccess} from '../../actions/auth.js';
import {toggleMobileNav} from '../../actions/mobile.js';
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
    this.toggleProfile = this.toggleProfile.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount(){
    const state = store.getState();
    if (localStorage.getItem('invaderUsername')){
      this.props.isLoggedIn(true);
      this.props.setCurrentUser(localStorage.getItem('invaderUsername'));
      console.log('currentUser: ' + localStorage.getItem('invaderUsername'));
      this.props.fetchUserProfile(`https://parking-hos-backend.herokuapp.com/profile?username=${localStorage.getItem('invaderUsername')}`);
    }
  }

  componentWillUpdate(){
    const state = store.getState();
    console.log('here is the state ', state);
    console.log('here is the dropdown open: ', state.dropdownOpen);
    console.log('here is maybe the actual value: ', state.toggleModal.dropdownOpen);
  }

  //opens and closes registration modal
  toggleRegister() {
    const state = store.getState();
    console.log('toggle register hit!');
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

  toggleProfile(){
    const state = store.getState();
    console.log('logging canViewProfile in Component: ' + state.toggleModal.canViewProfile);
    this.props.toggleProfile(state.toggleModal.canViewProfile);
  }

  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('invaderUsername');
    this.props.logOut();
  }

  //Exapnds and collapses the mobile-view nav. This will only open when hamburger is clicked.
  toggleMobileNav(e) {
    e.preventDefault();
      this.props.toggleMobileNav(this.props.canViewMobileNav)
  }

  toggleDropdown(e) {
    e.preventDefault();
    const state = store.getState();
      this.props.toggleDropdown(state.toggleDropdown)
  }

  render() {
    return (
      <div className="flyout">
        <Navbar color="black" dark expand="md">
          <NavbarBrand href="/">Space Invaderz</NavbarBrand>
          <NavbarToggler onClick={this.toggleMobileNav}/>
          <ul className="dropdown-menu mobileNav" style={{display: this.props.canViewMobileNav ? 'block' : 'none'}}>
            <li className ={this.props.userLoggedIn? "hideMe" : "navList"} onClick={this.toggleLogin}><b>Login</b></li>
            <li className ={this.props.userLoggedIn ? "hideMe" : "navList"} onClick={this.toggleRegister}><b>Register</b></li>
            <li className ={this.props.userLoggedIn ? "navList" : "hideMe"} onClick={this.toggleProfile}><b>View Profile</b></li>
            <li className ={this.props.userLoggedIn ? "navList" : "hideMe"} onClick={this.logOut}><b>Log Out</b></li>
          </ul>


          <Dropdown toggle={this.toggleDropdown} isOpen={this.props.dropdownOpen}>
          <DropdownToggle>
            Material dropdown
          </DropdownToggle>
          <DropdownMenu>
          <DropdownItem href="#">Action</DropdownItem>
          <DropdownItem href="#">Another Action</DropdownItem>
          <DropdownItem href="#">Something else here</DropdownItem>
          <DropdownItem href="#">Something else here</DropdownItem>
          </DropdownMenu>
          </Dropdown>

          <div className="collapse navbar-collapse" id="reactNavbar">
            <NavbarNav className="ml-auto">
              <div className={this.props.userLoggedIn ? "hideMe" : "loggedIn"}>
                <NavItem>
                  <Button onClick={this.toggleLogin}>Login</Button>
                </NavItem>
                <NavItem>
                  <Button onClick={this.toggleRegister}>Register</Button>
                </NavItem>
              </div>
              <div className={this.props.userLoggedIn ? "loggedIn" : "hideMe"}>
                <NavItem>
                  <Button onClick={this.toggleProfile}>View Profile</Button>
                </NavItem>
                <NavItem>
                  <Button onClick={this.logOut}>Log Out</Button>
                </NavItem>
              </div>
            </NavbarNav>
          </div>
        </Navbar>
        <Register isOpen = {this.props.canViewRegisterModal} toggle={this.toggleRegister} />
        <Login isOpen = {this.props.canViewLoginModal} toggle={this.toggleLogin} openLogin={this.toggleRegister}/>
        <Add isOpen = {this.props.canViewAddModal} toggle={this.toggleAdd} />
        <Profile isOpen = {this.props.canViewProfile} toggle={this.toggleProfile} />
        <div className={this.props.userLoggedIn ? "fab" : "hideMe"}>
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
    canViewRegisterModal: state.toggleModal.canViewRegisterModal,
    canViewMobileNav: state.canViewMobileNav,
    canViewProfile: state.toggleModal.canViewProfile,
    dropdownOpen: state.toggleModal.dropdownOpen,
    userLoggedIn: state.isLoggedIn
  };
};

//same as above that this method is for react-redux. Maps the dispatch action to a component's props. That's why you can call this.props.fetchData()
const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn : (bool) => dispatch(isLoggedIn(bool)),
    toggleModal : (bool) => dispatch(toggleModal(bool)),
    toggleLoginModal : (bool) => dispatch(toggleLoginModal(bool)),
    toggleRegisterModal : (bool) => dispatch(toggleRegisterModal(bool)),
    toggleMobileNav : (bool) => dispatch(toggleMobileNav(bool)),
    toggleProfile: (bool) => dispatch(toggleProfile(bool)),
    toggleDropdown: (bool) => dispatch(toggleDropdown(bool)),
    setCurrentUser : (username) => dispatch(loginUserSuccess(username)),
    fetchUserProfile: (url) => dispatch(fetchUserProfile(url)),
    logOut : () => dispatch(logOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

//export default onClickOutside(Nav);
