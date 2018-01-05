import fetch from 'isomorphic-fetch';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'devolunteer';
const CLOUDNINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dy7kdxxqe/image/upload';

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

export function statesFetchDataSuccess(states) {
  return {
    type: 'STATES_FETCH_DATA_SUCCESS',
    states
  };
}

export function updateCarModels(carModels) {
  console.log('LOGGING THE EVENT TARGET ', carModels);
  return {
    type: 'CAR_MAKE_PICKED',
    carModels
  };
}

export function fileUploadSuccess(secure_url) {
  return {
    type: 'IMG_UPLOAD_SUCESS',
    secure_url
  };
}

export function carsFetchData(url) {
  return (dispatch) => {
    dispatch(carsAreLoading(true));

    fetch(url)
      .then(function(cars) {
        dispatch(carsAreLoading(false));
        return cars.json();
      })
      .then(function(cars) {
        return cars
      })
      .then((cars) => dispatch(carsFetchDataSuccess(cars)))
      .catch(err => {
        console.log(err);
      });
  };
}

export function statesFetchData(url) {
  return (dispatch) => {
    fetch(url)
      .then(function(states) {
        return states.json();
      })
      .then(function(states) {
        return states
      })
      .then((states) => dispatch(statesFetchDataSuccess(states)))
      .catch(err => {
        console.log(err);
      });
  };
}

export function uploadFiles(files) {
  return (dispatch) => {
    let upload = request.post(CLOUDNINARY_UPLOAD_URL)
      .field('upload_present', CLOUDINARY_UPLOAD_PRESET)
      .field('file', files)
    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== '') {
        dispatch(fileUploadSuccess(response.body.secure_url))
      }
    })
  }
}
