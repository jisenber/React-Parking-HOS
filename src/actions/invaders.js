import fetch from 'isomorphic-fetch';
import request from 'superagent';
import {store} from '../index'

export function removeImage() {
  return {
    type: 'INVADER_REMOVE_IMAGE'
  };
}

export function invadersFetchDataSuccess(invaders) {
  return {
    type: 'INVADER_FETCH_DATA_SUCCESS',
    invaders
  };
}

export function invaderShameUpdate(shameCount) {
  return {
    type: 'INVADER_SHAME_UPDATE',
    shameCount
  };
}

export function fetchInvadersData(url) {
  let invaderList = [];
  return (dispatch) => {
    fetch(url)
    .then((invaders) => {
      return invaders.json();
    })
    .then((invaders) => {
      while(invaders.length) {
        invaderList.push(invaders.pop());
      }
      return invaderList
    })
    .then((invaders) => dispatch(invadersFetchDataSuccess(invaders)))
    .catch(err => {
      console.log(err);
    });
  };
}

export function postShame(invaderId) {
  return (dispatch) => {
    request.post(`https://parking-hos-backend.herokuapp.com/shame?invader=${invaderId}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      var currentState = store.getState();
      var invaderList = currentState.invaderList;
      var newInvaderList = invaderList.map(function(invader) {
        return (invader._id === response.body._id) ? {...invader, shame: response.body.shame} : invader
    });
      dispatch(invadersFetchDataSuccess(newInvaderList))
    })
    .catch((err) => {
      console.log('error posting ', err);
    })
  }
}
