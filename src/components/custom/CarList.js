//This is where we will get the array of objects from the back-end then map them onto Invader Components and render them

//TODO: figure out how to fetch all the Invaders from back them and store them as state in Redux store.


import React, { Component } from 'react';
import {connect} from 'react-redux';
import {carsFetchData} from '../../actions/cars';

class CarList extends Component {

  //once the component mounts, run the fetchData method. fetchData is defined below in mapDispatchToProps which assigns it to an action. The action can be found in ../../actions/cars.js
  componentDidMount() {
    this.props.fetchCars('https://localhost:8080/cars')
  }

  render() {
    return (
      <ul>
        {this.props.cars.map((cars) => (
          <li key={cars.make}>
            {cars.model}
          </li>
        ))}
      </ul>
    );
  }
}

//method that you define that is part of react-redux. Sends the state of the applications to the props of a component.
const mapStateToProps = (state) => {
  return {
    cars: state.cars,
    isLoading: state.itemsIsLoading
  };
};

//same as above that this method is for react-redux. Maps the dispatch action to a component's props. That's why you can call this.props.fetchData()
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCars: (url) => dispatch(carsFetchData(url))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CarList);
