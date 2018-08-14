// export function invaderList(state={}, action) {
//   switch(action.type) {
//   case 'INVADER_FETCH_DATA_SUCCESS':
//     return action.invaders;
//   default:
//     return state;
//   }
// }

export function invaderList(state = {
  displayedInvaders: [], pageNumber: 0
}, action) {
  switch(action.type) {
  case 'INVADER_FETCH_DATA_SUCCESS':
    return Object.assign({}, state, {
      displayedInvaders: action.invaders,
      pageNumber: (action.shouldIterate) ? action.pageNumber + 1 : action.pageNumber
    });
  default:
    return state;
  }
}

export function shameCount(state = 0, action) {
  switch(action.type) {
  case 'INVADER_SHAME_UPDATE':
    return action.shameCount;
  default:
    return state;
  }
}
