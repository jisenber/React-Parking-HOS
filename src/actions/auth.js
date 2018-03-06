import request from 'superagent';
//
//
// export function checkCurrentUser(cb) {
//   return () => {
//     request.get('http://localhost:4200/authenticate')
//       .then((response) => {
//         console.log('here is the response');
//         cb(response.body.username);
//       })
//       .catch((err) => {
//         console.log('this is an error:', err);
//       });
//   };
// }

export function isLoggedIn(bool) {
  return {
    type: 'LOGGED_IN',
    bool
  };
}

export function loginUserSuccess(passportResponse){
  return{
    type: 'USER_ESTABLISHED',
    passportResponse
  }
}

export function login(userName, password){
  return (dispatch) => {
    request.post('http://localhost:4200/login')
      .set('Content-Type', 'application/json')
      .send({username: userName, password: password})
      .then((response) => {
        console.log('heres the login response', response);
        dispatch(loginUserSuccess(response))
      })
      .catch((err) => {
        console.log('error logging user in', err);
      })
  }
}
