// import request from 'superagent';
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
