export function carsAreLoading(state=false, action) {
  switch(action.type) {
  case'CARS_ARE_LOADING':
    return action.isLoading;

  default:
    return state;
  }
}
//every reducer will return a discrete property of the state, regardless of how many conditions are inside that reducer

export function cars(state=[], action) {
  switch(action.type) {
  case 'CARS_FETCH_DATA_SUCCESS':
    return action.cars;

  default:
    return state;
  }
}
