import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import {toggleLoginModal} from '../../actions/modal.js';
import {postShame} from '../../actions/invaders';
import {invadersFetchDataSuccess} from '../../actions/invaders';
import {store} from '../../index.js';

const cardStyle = {
  fontSize: '1.1rem'
};

let hasRun = false;

const shameStyle = {
  fontSize: '1.1rem',
  textAlign: 'center'
};

class InvaderPage extends Component {

constructor(props) {
  super(props);
  this.shameInvader = this.shameInvader.bind(this);
}

shameInvader(e) {
  e.preventDefault()
  var state = store.getState();
  if(state.isLoggedIn){
    this.props.postShame(e.currentTarget.id, state.invaderList.pageNumber)
  } else {
      this.props.toggleLoginModal(state.toggleModal.canViewLoginModal);
      alert('Please log in to shame this invader.')
    }
}

  render(){
      return(
        <div className="row mt-5" className="invaderContainer">
            <Card className="invaderCard">
              <CardImage className="img-fluid thumbnail" src={this.props.invader.img_url}/>
              <CardBody>
                <CardTitle>{this.props.invader.lic_plate}</CardTitle>
                <CardText style={cardStyle}>{this.props.invader.lic_state}</CardText>
                <CardText style={cardStyle}>{this.props.invader.make}: {this.props.invader.model}</CardText>
                <Button href="#" onClick={this.shameInvader} id={this.props.invader._id}>Shame!</Button>
                <CardText style={shameStyle}><i className="fa fa-thumbs-o-down" aria-hidden="true">  </i> {this.props.invader.shame} shamings</CardText>
                <CardText style={cardStyle}><small>Date Posted: {this.props.invader.date.slice(0,10)}</small></CardText>
              </CardBody>
            </Card>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    invaderList: state.invaderList,
    shameCount: state.shameCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postShame : (invaderId, pageNumber) => dispatch(postShame(invaderId, pageNumber)),
    toggleLoginModal : (bool) => dispatch(toggleLoginModal(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvaderPage);
