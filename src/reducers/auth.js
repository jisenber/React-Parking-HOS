export function currentUser(state='', action) {
  switch(action.type) {
  case'USER_ESTABLISHED':
    return action.username;
  case'USER_NULLIFIED':
    return action.username;
  default:
    return state;
  }
}

export function isLoggedIn(state=false, action) {
  switch(action.type) {
    case 'LOGGED_IN':
      return action.isLoggedIn;
    default:
      return state;
  }
}
