export function carsAreLoading(state=false, action) {
  switch(action.type) {
  case'CARS_ARE_LOADING':
    return action.isLoading;

  default:
    return state;
  }
}

export function cars(state=[], action) {
  switch(action.type) {
  case 'CARS_FETCH_DATA_SUCCESS':
    return action.cars;

  default:
    return state;
  }
}

export function carModels(state = [], action) {
  switch(action.type) {
  case 'CAR_MAKE_PICKED':
    return action.carModels;

  default:
    return state;
  }
}

export function imgUrl(state='', action) {

  switch(action.type){
    case 'IMG_UPLOAD_SUCCESS':
      console.log('this is a secure url', action.secure_url);
      return action.secure_url;
    default:
      console.log('default condition hit');
      return state;
  }
}
