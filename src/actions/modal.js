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

export function toggleProfile(bool) {
  return {
    type: 'TOGGLE_PROFILE',
    canViewRegisterModal: bool
  }
}

export function profileFetchDataSuccess(user){
  console.log('profile has been fetched' + user);
  return {
    type: 'USER_PROFILE_FETCHED',
    userProfile: user
  }
}

export function fetchUserProfile(url) {
  return(dispatch) => {
    fetch(url)
      .then(function(user) {
        return user.json();
      })
      .then(function(user){
        console.log('user profile ' + user);
        return user
      })
      .then((user) => dispatch(profileFetchDataSuccess(user)))
      .catch(err => {
        console.log(err);
      });
  }
}
