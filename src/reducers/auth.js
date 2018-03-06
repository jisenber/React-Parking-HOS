export function currentUser(state='', action) {
  switch(action.type) {
  case'USER_ESTABLISHED':
    return action.username;

  default:
    return state;
  }
}

export function isLoggedIn(state=false, action) {
  console.log("actionType", action.type);
  switch(action.type) {
    case 'LOGGED_IN':
    console.log("reducer hit", action.isLoggedIn);
      return action.isLoggedIn;

    default:
      return state;
  }
}
