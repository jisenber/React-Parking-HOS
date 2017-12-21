import {combineReducers} from 'redux';
import {cars, carsAreLoading} from './cars';
import {states} from './states';

export default combineReducers({
  cars,
  carsAreLoading,
  states,
  // statesAreLoading
});
