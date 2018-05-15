import request from 'superagent';
import {toggleRegisterModal} from './modal' ;

export function signUpUserSuccess(username) {
  return {
    type: 'USER_ESTABLISHED',
    username
  };
}


export function signUpUser(email, userName, password) {
  return (dispatch) => {
    request.post('https://parking-hos-backend.herokuapp.com/signup')
      .set('Content-Type', 'application/json')
      .send({email: email, username: userName, password : password})
      .then((response) => {
        console.log('here is the response ' + response);
        dispatch(signUpUserSuccess(response.body.username));
        dispatch(toggleRegisterModal(true));
        //cb(response.body.username);
      })
      .catch((err) => {
        console.log('this is an error:', err);
      });
  };
}
