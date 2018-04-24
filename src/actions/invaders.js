import fetch from 'isomorphic-fetch';
import request from 'superagent';
import {store} from '../index'

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
  return (dispatch) => {
    fetch(url)
    .then((invaders) => {
      return invaders.json();
    })
    .then((invaders) => {
      return invaders
    })
    .then((invaders) => dispatch(invadersFetchDataSuccess(invaders)))
    .catch(err => {
      console.log(err);
    });
  };
}

export function postShame(invaderId, userName) {
  console.log(invaderId, userName);
  return (dispatch) => {
    console.log("Inside postShame");
    request.post(`https://parking-hos-backend.herokuapp.com/shame/${invaderId}`)
    .set('Content-Type', 'application/json')
    .send({user: userName})
    .then((response) => {
      var currentState = store.getState();
      var invaderList = currentState.invaderList;
      var newInvaderList = invaderList.map((invader) => {
        invader.id === invaderId ? {...invader, shame: response.body} : invader
      })
      // for(var i = 0; i< invaderList.length; i++){
      //   if (invaderList[i].id === invaderId){
      //     invaderList[i].shame = response.body
      //     break
      //   }
      // }
      console.log('invaderlist', invaderList)
      dispatch(invadersFetchDataSuccess(newInvaderList))
      console.log('this is the response', response.body);
    })
    .catch((err) => {
      console.log('error posting ', err);
    })
  }
}
