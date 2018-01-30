export function toggleModal(bool) {
  return {
    type: 'TOGGLE_MODAL',
    canViewAddModal: bool
  };
}
