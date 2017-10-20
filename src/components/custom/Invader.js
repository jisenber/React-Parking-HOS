import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';

const cardStyle = {
  fontSize: '1.1rem'
};

//The Invader List component will iterate over the array of objects (Invaders) it gets from the back end and the props of each object will be fed into this Invader Component.  
class Invader extends Component {
  render () {
    return(
      <div className="container">
        <div className="row mt-5">
          <div className="col" style={{ maxWidth: '23rem' }}>
            <Card>
              <CardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody>

                <CardTitle>Lic Plate here</CardTitle>
                <CardText style={cardStyle}>Make goes here</CardText>
                <CardText style={cardStyle}>Model Goes here</CardText>

                <Button href="#">Shame!</Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Invader;
