export function toggleModal(state = {
  canViewAddModal: false,
  canViewLoginModal:false,
}, action) {
  switch(action.type) {
  case 'TOGGLE_MODAL':
  console.log('here is canViewAddModal', !action.canViewAddModal);
    return Object.assign({}, state, {
      canViewAddModal: !action.canViewAddModal,
    });
  case 'TOGGLE_LOGIN':
  console.log('here is canViewLoginModal', !action.canViewLoginModal);
    return Object.assign({}, state, {
      canViewLoginModal: !action.canViewLoginModal,
    });
  default:
    return state;
  }
}

// export function toggleLoginModal(state=false, action) {
//   switch(action.type) {
//   case 'TOGGLE_LOGIN':
//     return !action.canViewLoginModal;
//   default:
//     return state;
//   }
// }
