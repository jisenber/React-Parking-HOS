export function currentUser(state='', action) {
  switch(action.type) {
  case'USER_ESTABLISHED':
    return action.username;

  default:
    return state;
  }
}
