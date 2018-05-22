import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbreact';
import {connect} from 'react-redux';
import {fetchUserProfile, toggleModal} from '../../actions/modal.js';
import {signUpUser} from '../../actions/register.js';
import {store} from '../../index.js';

//Registration modal component. Only need HTML for now, but incorporating state may be necessary when we implement authentication. props are passed in from Nav component and they can take the form of any object (including functions)
export class Profile extends Component {

  handleEmailChange(e){
    this.setState({
      email: e.target.value
    })
}

  render () {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={this.props.backdrop}>
        <ModalHeader toggle={this.props.toggle}>Profile Modal</ModalHeader>
        <ModalBody>

        <p>Email: {this.props.userEmail}</p>

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
    canViewProfile: state.toggleModal.canViewProfile,
    currentUser: state.username,
    userEmail: state.userProfile.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal : (bool) => dispatch(toggleModal(bool))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
