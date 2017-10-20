import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbreact';

class Register extends Component {
  render () {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={this.props.backdrop}>
        <ModalHeader toggle={this.props.toggle}>Registration Modal</ModalHeader>
        <ModalBody>
        <form id = "registerForm">
          <div className="md-form form-sm">
            <i className="fa fa-envelope prefix"></i>
            <input type="text" id="registerEmail" className="form-control" placeholder="Your email"/>
          </div>
          <div className="md-form form-sm">
            <i className="fa fa-lock prefix"></i>
            <input type="password" id="registerPassword" className="form-control" placeholder="Your password"/>
          </div>
          <div className="md-form form-sm">
            <i className="fa fa-lock prefix"></i>
            <input type="password" id="registerPassword" className="form-control" placeholder="Repeat password"/>
          </div>
          <div className="text-center mt-2">
            <button type="submit" className="btn btn-info waves-effect waves-light" id="registerBtn">Sign Up<i className="fa fa-sign-in ml-1"></i></button>
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


export default Register;
