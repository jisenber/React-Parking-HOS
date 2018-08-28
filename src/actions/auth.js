import request from 'superagent';
import {toggleLoginModal} from './modal';

export function logOut() {
  return (dispatch) => {
    dispatch(isLoggedIn(false));
    dispatch(nullifyUser());
  };
}

export function nullifyUser() {
  return {
    type: 'USER_NULLIFIED',
    username: ''
  };
}

export function isLoggedIn(bool) {
  return {
    type: 'LOGGED_IN',
    isLoggedIn: bool
  };
}

export function loginUserSuccess(username){
  return{
    type: 'USER_ESTABLISHED',
    username
  }
}

export function login(userName, password){
  return (dispatch) => {
    request.post('https://parking-hos-backend.herokuapp.com/login')
      .set('Content-Type', 'application/json')
      .send({username: userName, password: password})
      .then((response) => {
        dispatch(loginUserSuccess(response.body.username));
        dispatch(toggleLoginModal(true));
        dispatch(isLoggedIn(true));
      })
      .catch((err) => {
        console.log('error logging user in', err);
      })
  }
}
