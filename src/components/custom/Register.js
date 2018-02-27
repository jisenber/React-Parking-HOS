import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbreact';
import {connect} from 'react-redux';
import {toggleModal} from '../../actions/modal.js';
import {signUpUser} from '../../actions/register.js';
import {store} from '../../index.js';

//Registration modal component. Only need HTML for now, but incorporating state may be necessary when we implement authentication. props are passed in from Nav component and they can take the form of any object (including functions)
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      repeatPassword: ''
    }
    this.signUp = this.signUp.bind(this);
  }

  componentWillReceiveProps(){
    var state = store.getState();
    console.log(state);
  }

  signUp(e){
    e.preventDefault();
    if (this.state.password !== this.state.repeatPassword){
      alert("Password must match");
      return
    }
    this.props.signUpUser(this.state.userName, this.state.password);
    const state = store.getState();
    this.props.toggleModal(state.toggleModal);

    if (this.props.userRegistrationHandler) {
      localStorage.setItem('spaceInvaders', this.props.userRegistrationHandler.user.body.username)
    }
  }

  handleUserChange(e){
    this.setState({
      userName: e.target.value
    })
  }

  handlePasswordChange(e){
    this.setState({
      password: e.target.value
    })
  }

  handleRepeatPasswordChange(e){
    this.setState({
      repeatPassword: e.target.value
    })
  }


  render () {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={this.props.backdrop}>
        <ModalHeader toggle={this.props.toggle}>Registration Modal</ModalHeader>
        <ModalBody>
          <form id = "registerForm">
            <div className="md-form form-sm">
              <i className="fa fa-envelope prefix"></i>
              <input type="text" id="registerEmail" className="form-control" placeholder="Your email" onChange={this.handleUserChange.bind(this)}/>
            </div>
            <div className="md-form form-sm">
              <i className="fa fa-lock prefix"></i>
              <input type="password" id="registerPassword" className="form-control" placeholder="Your password" onChange={this.handlePasswordChange.bind(this)}/>
            </div>
            <div className="md-form form-sm">
              <i className="fa fa-lock prefix"></i>
              <input type="password" id="repeatPassword" className="form-control" placeholder="Repeat password" onChange={this.handleRepeatPasswordChange.bind(this)}/>
            </div>
            <div className="text-center mt-2">
              <button type="submit" className="btn btn-info waves-effect waves-light" id="registerBtn" onClick={this.signUp}>Sign Up<i className="fa fa-sign-in ml-1"></i></button>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-outline-info waves-effect ml-auto" onClick={this.props.toggle}>Close<i className="fa fa-times-circle ml-1"></i></button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    canViewRegisterModal: state.toggleModal.canViewRegisterModal,
    currentUser: state.userRegistrationHandler.username
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal : (bool) => dispatch(toggleModal(bool)),
    signUpUser : (userName, password) => dispatch(signUpUser(userName, password))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Register);
