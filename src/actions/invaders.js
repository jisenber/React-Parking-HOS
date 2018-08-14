import fetch from 'isomorphic-fetch';
import request from 'superagent';
import {store} from '../index';

export function removeImage() {
  return {
    type: 'INVADER_REMOVE_IMAGE'
  };
}

export function invadersFetchDataSuccess(invaders, pageNumber, shouldIterate) {
  return {
    type: 'INVADER_FETCH_DATA_SUCCESS',
    invaders, pageNumber, shouldIterate
  };
}

export function invadersDataSortedSuccess(invaders) {
  return {
    type: 'INVADER_DATA_SORTED_SUCCESS',
    invaders
  }
}

export function invaderShameUpdate(shameCount) {
  return {
    type: 'INVADER_SHAME_UPDATE',
    shameCount
  };
}

export function fetchInvadersData(url, invadersOnPage, pageNumber) {
  console.log('here are the invaders on page: ', invadersOnPage);
  let invaderList = invadersOnPage;
  return (dispatch) => {
    fetch(`${url}?page=${pageNumber}`)
    .then((invaders) => {
      return invaders.json();
    })
    // .then((invaders) => {
    //   return invaders.slice((pageNumber * 15), (pageNumber * 15 + 15))
    // })
    .then((invaders) => {
      return invaderList.concat(invaders)
    })
    .then((invaders) => {
      dispatch(invadersFetchDataSuccess(invaders, pageNumber, true /* should iterat pageNumber */))
    })
    .catch(err => {
      console.log(err);
    });
  };
}

export function postShame(invaderId, pageNumber) {
  return (dispatch) => {
    request.post(`https://parking-hos-backend.herokuapp.com/shame?invader=${invaderId}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      var currentState = store.getState();
      var invaderList = currentState.invaderList.displayedInvaders;
      var newInvaderList = invaderList.map(function(invader) {
        return (invader._id === response.body._id) ? {...invader, shame: response.body.shame} : invader
    });
      dispatch(invadersFetchDataSuccess(newInvaderList, pageNumber, false))
    })
    .catch((err) => {
      console.log('error posting ', err);
    })
  }
}

export function sortInvadersByShame(invaderList, pageNumber) {
  return (dispatch) => {
    const invaderShameObject = invaderList.reduce(function(acc, curr) {
      if(!acc[curr.shame]){
        acc[curr.shame] = [curr];
      } else {
        acc[curr.shame].push(curr);
      }
     return acc;
  }, {});
    const shameCounts = Object.keys(invaderShameObject);
    const sortedShameCounts = shameCounts.sort(function(a, b) {
      return b-a;
    });
    let sorted = [];
    for (var i = 0; i < shameCounts.length; i++) {
      sorted.push(invaderShameObject[sortedShameCounts[i]])
    }
    const merged = [].concat.apply([], sorted)
    dispatch(invadersFetchDataSuccess(merged, pageNumber, false /* should iterate */));
  }
}

export function sortInvadersByDate(invaderList, pageNumber) {
  return (dispatch) => {
    const sortedDates = invaderList.sort(function(a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return d-c;
    });
    const merged = [].concat.apply([], sortedDates)
    console.log('sorted dates:', sortedDates);
    dispatch(invadersFetchDataSuccess(merged, pageNumber, false /* should iterate */));
  }
}

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }
  const middle = Math.floor(array.length/2)
  const rightSide = array.slice(0, middle);
  const leftSide = array.slice(middle);

  return  merge(mergeSort(rightSide), mergeSort(leftSide))
}

function merge(leftSide, rightSide) {
  var i = 0;
  var j = 0;
  let sorted = [];
  while((i < leftSide.length) && (j < rightSide.length)) {
    if(leftSide[i] > rightSide[j]) {
      sorted.push(leftSide[i]);
      i += 1;
    } else {
      sorted.push(rightSide[j]);
      j += 1;
    }
  }
  return sorted.concat(leftSide.slice(i).concat(rightSide.slice(j)));
}
