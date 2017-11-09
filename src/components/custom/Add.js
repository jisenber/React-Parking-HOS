import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbreact';
import {store} from '../../index.js'

class Add extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cars: []
    }

    this.loadCars = this.loadCars.bind(this)
  }

  loadCars() {
    if(this.state.cars.length) {
      return
    } else {
      var self = this
      var carInfo = store.getState()
      carInfo.cars.map(function(car) {
        return self.state.cars.push(car)
      })
    }
  }


  render(){
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
                  this.state.cars.map(function(car) {
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
          <button type="button" className="btn btn-outline-info waves-effect ml-auto" onClick={this.props.toggle, this.loadCars()}>Close<i className="fa fa-times-circle ml-1"></i></button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default Add;
