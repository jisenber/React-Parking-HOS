export function toggleModal(state = {
  canViewAddModal: false,
  canViewLoginModal: false,
  canViewRegisterModal: false,
}, action) {
  switch(action.type) {
  case 'TOGGLE_MODAL':
    return Object.assign({}, state, {
      canViewAddModal: !action.canViewAddModal,
    });
  case 'TOGGLE_LOGIN':
    return Object.assign({}, state, {
      canViewLoginModal: !action.canViewLoginModal,
    });
  case 'TOGGLE_REGISTER':
  console.log('here is canViewRegisterModal', !action.canViewRegisterModal);
    return Object.assign({}, state, {
      canViewRegisterModal: !action.canViewRegisterModal,
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
