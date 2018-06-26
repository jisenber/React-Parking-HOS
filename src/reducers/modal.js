export function toggleModal(state = {
  canViewAddModal: false,
  canViewLoginModal: false,
  canViewRegisterModal: false,
  canViewProfile: false,
  dropdownOpen: false,
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
    return Object.assign({}, state, {
      canViewRegisterModal: !action.canViewRegisterModal,
    });
  case 'TOGGLE_PROFILE':
    return Object.assign({}, state, {
      canViewProfile: !action.canViewProfile,
    });
  case 'TOGGLE_DROPDOWN':
    console.log('toggle dropdown case hit in reducer', action)
    return Object.assign({}, state, {
      dropdownOpen: !action.dropdownOpen,
    });
  default:
    return state;
  }
}

export function userProfile(state = {
  username : '',
  email : '',
  posts : []
}, action) {
  switch (action.type) {
    case 'USER_PROFILE_FETCHED':
      console.log(action.userProfile);
      return Object.assign({}, state, {username:action.userProfile.username, email:action.userProfile.email, posts:action.userProfile.posts
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
