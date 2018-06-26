import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import {connect} from 'react-redux';
import {toggleLoginModal} from '../../actions/modal.js';
import {fetchInvadersData, postShame} from '../../actions/invaders';
import {store} from '../../index.js';
import '../../style/invader-list-style.css';


const cardStyle = {
  fontSize: '1.1rem'
};

const shameStyle = {
  fontSize: '1.1rem',
  textAlign: 'center'
};


//The Invader List component will iterate over the array of objects (Invaders) it gets from the back end and the props of each object will be fed into this Invader Component.
export class Invader extends Component {
  constructor(props){
    super(props);
    this.shameInvader = this.shameInvader.bind(this);
  }

  shameInvader(e) {
    e.preventDefault()
    var state = store.getState();
    if(state.isLoggedIn){
      this.props.postShame(e.currentTarget.id)
    } else {
        this.props.toggleLoginModal(state.toggleModal.canViewLoginModal);
        alert('Please log in to shame this invader.')
      }
  }

  componentDidMount() {
    if(this.props.fetchInvaders) {
      this.props.fetchInvaders('https://parking-hos-backend.herokuapp.com/invaders', function(invaders){
        const paginatedInvaders = [];
        while (invaders.length){
        paginatedInvaders.push([invaders.slice(0,12)])
        invaders.splice(0,12);
          console.log("i am in the callback, here's the invaders:" + invaders);
        }
        console.log('paginated length = ' + paginatedInvaders.length);
        console.log('paginated = ' + paginatedInvaders);
      })
    } else {
      console.log('loading invaders');
    }
  }

  render () {
    if(Array.isArray(this.props.invaderList)) {
    return(
        <div className="row mt-5" className="invaderContainer">
          {
            this.props.invaderList.map((invader) => {
              return ( <div key={invader._id} className="singleInvader">
              <Card className="invaderCard">
                <CardImage className="img-fluid thumbnail" src={invader.img_url}/>
                  <CardBody>
                    <CardTitle>{invader.lic_plate}</CardTitle>
                    <CardText style={cardStyle}>{invader.lic_state}</CardText>
                    <CardText style={cardStyle}>{invader.make}: {invader.model}</CardText>
                    <Button href="#" onClick={this.shameInvader} id={invader._id}>Shame!</Button>
                    <CardText style={shameStyle}><i className="fa fa-thumbs-o-down" aria-hidden="true">  </i> {invader.shame} shamings</CardText>
                    <CardText style={cardStyle}>Posted By: {invader.posted_by}</CardText>
                    <CardText style={cardStyle}><small>Date Posted: {invader.date.slice(0,10)}</small></CardText>
                  </CardBody>
              </Card></div>
            )
          })
          }
          </div>
        );
    } else {
      return (
        <h1>Not working</h1>
      );
    }
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
    fetchInvaders : (url, cb) => dispatch(fetchInvadersData(url, cb)),
    postShame : (invaderId) => dispatch(postShame(invaderId)),
    toggleLoginModal : (bool) => dispatch(toggleLoginModal(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invader);
