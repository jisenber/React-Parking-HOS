import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbreact';
import {store} from '../../index.js'
import {connect} from 'react-redux';
import {carsFetchData} from '../../actions/cars';

export class Add extends Component {

  componentDidMount() {
    if(this.props.fetchCars) {
      this.props.fetchCars('http://localhost:4200/cars')
    } else {
      console.log('loading cars');
    }
  }

  render(){
    if(this.props.cars) {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={this.props.backdrop}>
        <ModalHeader toggle={this.props.toggle}>Submit an Invader</ModalHeader>
        <ModalBody>
          <form id = "invaderSubmit">
            <div className="md-form form-sm">
              <i className="fa fa-drivers-license prefix"></i>
                <input type="text" id="lic_plate_input" className="form-control" placeholder="License Plate" required/>
            </div>
            <div className="md-form form-sm">
            <i className="fa fa-map-marker prefix"></i>
              <select name="state" id="stateBar" className="form-control" required>
                <option value=""> ---States --- </option>
              </select>
            </div>
            <div className="md-form form-sm">
            <i className="fa fa-car prefix"></i>
              <select name="Make" id="makeBar" className="form-control" required>
                <option value="" key="top"> ---Make --- </option>
                {
                  this.props.cars.map(function(car) {
                    return <option value = ""key={car._id}>{car.make}</option>
                  })
                }
              </select>
            </div>
            <div className="md-form form-sm">
            <i className="fa fa-search-plus prefix"></i>
              <select name="Model" id="modelBar" className="form-control" required>
                  <option value=""> ---Model --- </option>

              </select>
            </div>
            <div id= "imageWidget">
              <a href="#" id="upload_widget_opener"></a>
            </div>
            <div className="text-center mt-1-half">
              <button className="btn btn-info mb-2" type="submit">Submit Invader <i className="fa fa-send ml-1"></i></button>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-outline-info waves-effect ml-auto" onClick={this.props.toggle}>Close<i className="fa fa-times-circle ml-1"></i></button>
        </ModalFooter>
      </Modal>
    );
  } else {
    return (
      <div></div>
    )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state.cars,
    isLoading: state.itemsIsLoading
  };
};

//same as above that this method is for react-redux. Maps the dispatch action to a component's props. That's why you can call this.props.fetchData()
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCars : (url) => dispatch(carsFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
