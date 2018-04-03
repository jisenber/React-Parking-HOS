import fetch from 'isomorphic-fetch';
import request from 'superagent';

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
    request.post(`https://parking-hos-backend.herokuapp.com/shame/${invaderId}`)
    .set('Content-Type', 'application/json')
    .send({user: userName})
    .then((response) => {
      dispatch(fetchInvadersData('https://parking-hos-backend.herokuapp.com/invaders'))
      console.log('this is the response', response.body);
    })
    .catch((err) => {
      console.log('error posting ', err);
    })
  }
}
