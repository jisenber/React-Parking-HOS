import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbreact';
import {store} from '../../index.js';
import {connect} from 'react-redux';
import {carsFetchData, statesFetchData, updateCarModels, uploadFiles} from '../../actions/cars';
import Dropzone from 'react-dropzone';

export class Add extends Component {

  handleMakeChange(e) {
    const carArr = store.getState().cars;
    console.log('here is the carArr', carArr);
    for (let i = 0; i < carArr.length; i++) {
      if (carArr[i].make === e.target.value) {
        this.props.updateCarModels(carArr[i].models)
        return;
      }
    }
    console.log('sorry no models found');
  }

  onImageDrop(files) {
    this.props.uploadFiles(files)
  }

  componentDidMount() {
    if(this.props.fetchCars) {
      this.props.fetchStates('https://parking-hos-backend.herokuapp.com/states'),
      this.props.fetchCars('https://parking-hos-backend.herokuapp.com/cars')
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
                {
                  this.props.states.map(function(state) {
                    return <option value={state.name} key={state._id}>{state.name}</option>
                  })
                }
              </select>
            </div>
            <div className="md-form form-sm">
            <i className="fa fa-car prefix"></i>
              <select name="Make" id="makeBar" className="form-control" onChange={this.handleMakeChange.bind(this)} required>
                <option value="" key="top"> ---Make --- </option>
                {
                  this.props.cars.map(function(car) {
                    return <option value={car.make} key={car._id}>{car.make}</option>
                  })
                }
              </select>
            </div>
            <div className="md-form form-sm">
            <i className="fa fa-search-plus prefix"></i>
              <select name="Model" id="modelBar" className="form-control" required>
                  <option value=""> ---Model --- </option>
                  {
                    this.props.carModels.map(function(model) {
                      return <option value={model} key={model}>{model}</option>
                    })
                  }
              </select>
            </div>
            <div id= "Dropzone">
              <Dropzone
                multiple={false}
                accept="image/*"
                onDrop={this.onImageDrop.bind(this)}>
                <p>Drop or select and image to upload.</p>
                </Dropzone>
                <div className="thumbnailHolder">
                    {this.props.imgUrl === '' ? null :
                  <div>
                    <img src={this.props.imgUrl} />
                  </div>}
                </div>
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
    states: state.states,
    isLoading: state.itemsIsLoading,
    carModels: state.carModels,
    imgUrl: state.imgUrl
  };
};

//same as above that this method is for react-redux. Maps the dispatch action to a component's props. That's why you can call this.props.fetchData()
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCars : (url) => dispatch(carsFetchData(url)),
    fetchStates : (url) => dispatch(statesFetchData(url)),
    updateCarModels: (carModels) => dispatch(updateCarModels(carModels)),
    uploadFiles: (files) => dispatch(uploadFiles(files))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
