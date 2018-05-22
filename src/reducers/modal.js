export function toggleModal(state = {
  canViewAddModal: false,
  canViewLoginModal: false,
  canViewRegisterModal: false,
  canViewProfile: false,
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
      return Object.assign({}, state, {username:action.username, email:action.email, posts:action.posts
      });
    default:
      return state;
  }
};

// export function toggleLoginModal(state=false, action) {
//   switch(action.type) {
//   case 'TOGGLE_LOGIN':
//     return !action.canViewLoginModal;
//   default:
//     return state;
//   }
// }
