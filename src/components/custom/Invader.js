import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import {connect} from 'react-redux';
import {fetchInvadersData} from '../../actions/invaders';
import {store} from '../../index.js';
import '../../style/invader-list-style.css';


const cardStyle = {
  fontSize: '1.1rem'
};


//The Invader List component will iterate over the array of objects (Invaders) it gets from the back end and the props of each object will be fed into this Invader Component.
export class Invader extends Component {

  componentWillUpdate() {
    if (this.props.invaderList) {
        console.log('here is the state', store.getState());
        console.log('here is the invader list', this.props.invaderList);
    }
  }

  componentDidMount() {
    if(this.props.fetchInvaders) {
      this.props.fetchInvaders('https://parking-hos-backend.herokuapp.com/invaders')
    } else {
      console.log('loading invaders');
    }
  }

  render () {
    if(Array.isArray(this.props.invaderList)) {
    return(
        <div className="row mt-5" className="invaderContainer">
          {
            this.props.invaderList.map(function(invader){
              return ( <div key={invader._id} className="singleInvader">
              <Card className="invaderCard">
                <CardImage className="img-fluid" src={invader.img_url}/>
                  <CardBody>
                    <CardTitle>{invader.lic_plate}</CardTitle>
                    <CardText style={cardStyle}>{invader.lic_state}</CardText>
                    <CardText style={cardStyle}>{invader.make}: {invader.model}</CardText>
                    <Button href="#">Shame!</Button>
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
    invaderList: state.invaderList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInvaders : (url) => dispatch(fetchInvadersData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invader);
