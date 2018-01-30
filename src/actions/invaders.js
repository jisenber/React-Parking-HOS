import fetch from 'isomorphic-fetch';

export function invadersFetchDataSuccess(invaders) {
  return {
    type: 'INVADER_FETCH_DATA_SUCCESS',
    invaders
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
