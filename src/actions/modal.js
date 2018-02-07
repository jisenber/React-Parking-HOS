export function toggleModal(bool) {
  return {
    type: 'TOGGLE_MODAL',
    canViewAddModal: bool
  };
}

export function toggleLoginModal(bool) {
  return {
    type: 'TOGGLE_LOGIN',
    canViewLoginModal: bool
  };
}
