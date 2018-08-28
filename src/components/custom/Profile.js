import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, CardText, CardImage } from 'mdbreact';
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

const thumbnail = {
  width: '150px',
  height: '150px',
  display: 'inline-flex',
  margin: '1em',
  flexWrap: 'wrap'
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap'
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

  render () {
    return (
      <Modal autoFocus={false} isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={this.props.backdrop}>
        <ModalHeader toggle={this.props.toggle}>Profile</ModalHeader>
        <ModalBody>
          <Card className="profileCard">
            <CardBody>
              <CardTitle>Your Personal Profile:</CardTitle>
              <CardText>Email Address: {this.props.userProfile.username}</CardText>
              <CardText> Invaders you have posted: </CardText>
              <div className="picture-container" style={containerStyle}>
              {
                this.props.userProfile.posts.map((post, i) => {
                  return (
                    <div key={i} style={thumbnail}>
                      <Card className="invaderCard">
                        <CardImage className="img-fluid" src={post}/>
                      </Card>
                    </div>
                  )
                })
              }
              </div>

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
