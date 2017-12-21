
//every reducer will return a discrete property of the state, regardless of how many conditions are inside that reducer

export function states(state=[], action) {
  switch(action.type) {
  case 'STATES_FETCH_DATA_SUCCESS':
    return action.states;

  default:
    return state;
  }
}
