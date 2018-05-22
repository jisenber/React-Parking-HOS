import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbreact';
import {connect} from 'react-redux';
import {fetchUserProfile, toggleModal} from '../../actions/modal.js';
import {signUpUser} from '../../actions/register.js';
import {store} from '../../index.js';

const profileStyle = {
  width: '500px',
  height: '500px',
  backgroundColor: '#FFF',
  display: 'block'
}

const hideStyle = {
  display: 'none'
}
//Registration modal component. Only need HTML for now, but incorporating state may be necessary when we implement authentication. props are passed in from Nav component and they can take the form of any object (including functions)
export class Profile extends Component {

  handleEmailChange(e){
    this.setState({
      email: e.target.value
    })
}
componentWillMount(){
  console.log('WillMount');
}

 componentDidMount(){
   console.log('I have mounted');
 }

 componentWillUpdate(){
   const state = store.getState()
   console.log('logging canViewProfile: ' + state.toggleModal.canViewProfile);
 }

  render () {
    return (
    <div style={this.props.canViewProfile ? profileStyle : hideStyle}>
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={this.props.backdrop}>
        <ModalHeader toggle={this.props.toggle} className="modalHeader">Login</ModalHeader>
        <ModalBody>
          <form id = "loginForm">
            <div className="md-form form-sm">
              <i className="fa fa-envelope prefix"></i>
              <input type="text" id="loginUsername" className="form-control" placeholder="Your username"/>
            </div>
            <div className="md-form form-sm">
              <i className="fa fa-lock prefix"></i>
              <input type="password" id="loginPassword" className="form-control" placeholder="Your password" />
            </div>
            <div className="text-center mt-2">
              <button type="submit" className="btn btn-info waves-effect waves-light" id="loginBtn">Log in <i className="fa fa-sign-in ml-1"></i></button>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <p className="darken-3" ><a className="blue-text">Don't have an Account?</a></p>
          <p className="darken-3" ><a className="blue-text">Forgot Password?</a></p>
          <button type="button" className="btn btn-outline-info waves-effect ml-auto" onClick={this.props.toggle}>Close<i className="fa fa-times-circle ml-1"></i></button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
}

const mapStateToProps = (state) => {
  return {
    canViewProfile: state.toggleModal.canViewProfile,
    currentUser: state.username,
    userEmail: state.userProfile.email,
    userProfile: state.userProfile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal : (bool) => dispatch(toggleModal(bool))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
