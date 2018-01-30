import {combineReducers} from 'redux';
import {cars, carsAreLoading, carModels, imgUrl} from './cars';
import {states} from './states';
import {invaderList} from './invaders';

export default combineReducers({
  cars,
  carsAreLoading,
  states,
  carModels,
  imgUrl,
  invaderList
});
