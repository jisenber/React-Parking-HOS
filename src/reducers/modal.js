export function toggleModal(state=false, action) {
  switch(action.type) {
  case 'TOGGLE_MODAL':
    return !action.canViewAddModal;
  default:
    return state;
  }
}

export function toggleLoginModal(state=false, action) {
  switch(action.type) {
  case 'TOGGLE_LOGIN':
    return !action.canViewLoginModal;
  default:
    return state;
  }
}
