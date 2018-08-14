import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import {connect} from 'react-redux';
import {toggleLoginModal} from '../../actions/modal.js';
import {fetchInvadersData, postShame} from '../../actions/invaders';
import InfiniteScroll from 'react-infinite-scroll-component';
import InvaderPage from './InvaderPage';
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
    this.fetchInvaders = this.fetchInvaders.bind(this);
  }

  fetchInvaders() {
    const state = store.getState();
    console.log("I have been CALLED" + state.invaderList);
    this.props.fetchInvaders('https://parking-hos-backend.herokuapp.com/invaders', state.invaderList.displayedInvaders, state.invaderList.pageNumber)
  }

  componentDidMount() {
    if(this.props.fetchInvaders) {
      this.props.fetchInvaders('https://parking-hos-backend.herokuapp.com/invaders', [], 0)
    } else {
      console.log('loading invaders');
    }
  }

  render () {
      return(
        <div className={Array.isArray(this.props.invaderList) ? 'show' : 'hide'}>
        <InfiniteScroll
          dataLength={this.props.invaderList.length}
          next={this.fetchInvaders}
          hasMore={true}
        >
        {
          this.props.invaderList.map((invader, i) => {
            return (
              <div key={i} className="singleInvader">
                <InvaderPage invader={invader} key={invader._id} />
              </div>
            )
          })
        }
        </InfiniteScroll>
        </div>
      )
    }
  }

const mapStateToProps = (state) => {
  return {
    invaderList: state.invaderList.displayedInvaders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInvaders : (url, invadersOnPage, pageNumber) => dispatch(fetchInvadersData(url, invadersOnPage, pageNumber))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invader);
