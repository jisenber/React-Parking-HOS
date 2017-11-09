import fetch from 'isomorphic-fetch';

//this is an action creator. It takes in a boolean and returns an argument and returns an object with a meaningful type and boolean
export function carsHasErrored(bool) {
  return {
    type: 'CARS_HAS_ERRORED',
    hasErrored: bool
  };
}
export function carsAreLoading(bool) {
  return {
    type: 'CARS_ARE_LOADING',
    isLoading: bool
  };
}
export function carsFetchDataSuccess(cars) {
  return {
    type: 'CARS_FETCH_DATA_SUCCESS',
    cars
  };
}

export function carsFetchData(url) {
  return (dispatch) => {
    dispatch(carsAreLoading(true));

    fetch(url)
      .then(function(cars) {
        console.log('MADE IT HERE');
        dispatch(carsAreLoading(false));
        return cars.json();
      })
      .then(function(cars) {
        console.log(cars);
        return cars
      })
      .then((cars) => dispatch(carsFetchDataSuccess(cars)))
      .catch(err => {
        console.log(err);
      });
  };
}
