export function userRegistrationHandler(state={}, action) {
  switch(action.type) {
  case'USER_REGISTERED':
    return Object.assign({}, state, {
      user: action.username
    });

  default:
    return state;
  }
}
