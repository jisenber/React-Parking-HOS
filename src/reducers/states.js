export function states(state=[], action) {
  switch(action.type) {
  case 'STATES_FETCH_DATA_SUCCESS':
    return action.states;

  default:
    return state;
  }
}
