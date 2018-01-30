export function toggleModal(state=false, action) {
  switch(action.type) {
  case 'TOGGLE_MODAL':
    return !action.canViewAddModal;
  default:
    return state;
  }
}
