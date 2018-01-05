import {combineReducers} from 'redux';
import {cars, carsAreLoading, carModels} from './cars';
import {states} from './states';

export default combineReducers({
  cars,
  carsAreLoading,
  states,
  carModels
});
