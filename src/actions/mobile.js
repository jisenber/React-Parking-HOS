export function toggleMobileNav(bool) {
  return {
    type: 'TOGGLE_MOBILENAV',
    canViewMobileNav: bool
  };
}
