export function invaderList(state=[], action) {
  switch(action.type) {
  case 'INVADER_FETCH_DATA_SUCCESS':
      return action.invaders;
  default:
    return state;
  }
}
