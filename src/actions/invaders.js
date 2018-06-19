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

export function sortInvadersByShame(invaderList) {
  return (dispatch) => {
    const invaderShameObject = invaderList.reduce(function(acc, curr) {
     acc[curr.shame] = curr;
     return acc;
  }, {});
    const shameCounts = Object.keys(invaderShameObject);
    const sortedShameCounts = mergeSort(shameCounts);
    console.log('shameObject?' + JSON.stringify(invaderShameObject));
    let sorted = [];
    for (var i = 0; i < shameCounts.length; i++) {
      sorted.push(invaderShameObject[sortedShameCounts[i]])
    }
    dispatch(invadersFetchDataSuccess(sorted));
  }
}

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }
  const middle = Math.floor(array.length/2)
  const leftSide = array.slice(0, middle);
  const rightSide = array.slice(middle);

  return  merge(mergeSort(leftSide), mergeSort(rightSide))
}

function merge(leftSide, rightSide) {
  let sorted = [];
  while(leftSide.length && rightSide.length) {
    if(leftSide[0] >= rightSide[0]) {
      sorted.push(leftSide.shift())
    } else {
      sorted.push(rightSide.shift())
    }
  }
  while(leftSide.length) {
    sorted.push(leftSide.shift())
  }
  while(rightSide.length) {
    sorted.push(rightSide.shift())
  }
  return sorted;
}
