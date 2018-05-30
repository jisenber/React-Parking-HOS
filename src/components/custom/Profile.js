import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, CardText } from 'mdbreact';
import {connect} from 'react-redux';
import {toggleModal} from '../../actions/modal.js';
// import {signUpUser} from '../../actions/register.js';
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
   console.log(this.props.userProfile);
 }

  render () {
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader>Profile</ModalHeader>
        <ModalBody>
          <Card className="profileCard">
            <CardBody>
              <CardTitle>Your Personal Profile:</CardTitle>
              <CardText>Email Address: {this.props.userProfile.username}</CardText>
            </CardBody>
          </Card>
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
