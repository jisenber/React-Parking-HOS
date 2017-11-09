import {combineReducers} from 'redux';
import {cars, carsAreLoading} from './cars';

export default combineReducers({
  cars,
  carsAreLoading
});
