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

export function toggleRegisterModal(bool) {
  return {
    type: 'TOGGLE_REGISTER',
    canViewRegisterModal: bool
  }
}
