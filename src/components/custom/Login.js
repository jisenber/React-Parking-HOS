import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbreact';
import {connect} from 'react-redux';
import {toggleModal} from '../../actions/modal.js';

//Very similar to Registration modal in terms of HTML content. All props received from parent Component.
class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      forgot: false
    };

    this.toggleForgot = this.toggleForgot.bind(this);
  }

  toggleForgot(){
    this.setState({
      forgot: !this.state.forgot
    });
  }

  render () {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={this.props.backdrop}>
        <ModalHeader toggle={this.props.toggle} className="modalHeader">Login</ModalHeader>
        <ModalBody>
          <form id = "loginForm">
            <div className="md-form form-sm">
              <i className="fa fa-envelope prefix"></i>
              <input type="text" id="loginEmail" className="form-control" placeholder="Your email"/>
            </div>
            <div className="md-form form-sm">
              <i className="fa fa-lock prefix"></i>
              <input type="password" id="loginPassword" className="form-control" placeholder="Your password"/>
            </div>
            <div className="text-center mt-2">
              <button type="submit" className="btn btn-info waves-effect waves-light" id="loginBtn">Log in <i className="fa fa-sign-in ml-1"></i></button>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <p className="darken-3" onClick={this.props.openLogin}><a className="blue-text">Don't have an Account?</a></p>
          <p className="darken-3" onClick={this.toggleForgot}><a className="blue-text">Forgot Password?</a></p>
          <button type="button" className="btn btn-outline-info waves-effect ml-auto" onClick={this.props.toggle}>Close<i className="fa fa-times-circle ml-1"></i></button>
        </ModalFooter>
        <div id = "forgot" style={{display: this.state.forgot ? 'block' : 'none'}}>
          <form id = "forgotForm">
            <div className="md-form form-sm">
              <i className="fa fa-envelope prefix"></i>
              <input type="text" id="forgotLoginEmail" className="form-control" placeholder="Your email"/>
            </div>
            <div className="text-center mt-2">
              <button type="submit" className="btn btn-info waves-effect waves-light" id="forgotBtn">Reset Password <i className="fa fa-sign-in ml-1"></i></button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    canViewLoginModal: state.toggleModal.canViewLoginModal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal : (bool) => dispatch(toggleModal(bool)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
