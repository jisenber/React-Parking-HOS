import request from 'superagent';
import {toggleRegisterModal} from './modal' ;

export function signUpUserSuccess(username) {
  return {
    type: 'USER_ESTABLISHED',
    username
  };
}


export function signUpUser(userName, password) {
  return (dispatch) => {
    request.post('https://parking-hos-backend.herokuapp.com/signup')
      .set('Content-Type', 'application/json')
      .send({username: userName, password : password})
      .then((response) => {
        dispatch(signUpUserSuccess(response.body.username));
        dispatch(toggleRegisterModal(true));
        //cb(response.body.username);
      })
      .catch((err) => {
        console.log('this is an error:', err);
      });
  };
}