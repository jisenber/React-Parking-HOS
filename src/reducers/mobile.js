export function canViewMobileNav(state = false, action) {
  switch(action.type) {
  case 'TOGGLE_MOBILENAV':
    console.log('here is the action', action);
    return !action.canViewMobileNav;
  default:
    return state;
  }
}
