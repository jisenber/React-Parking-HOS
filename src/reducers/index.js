const initialState = {
  showModal: false
};


//this is dummy code at the moment that will be changed once we implement redux correctly
//viewing and hiding modals will be controlled by UI state instead of redux
function parkingApp(state = initialState, action) {
  switch(action.type) {
  case 'TOGGLE_MODAL':
    if (!state.showModal) {
      return Object.assign({}, state, {
        showModal: true
      });
    } else {
      return Object.assign({}, state, {
        showModal: false
      });
    }
  default:
    return state;
  }
}


export default parkingApp;
