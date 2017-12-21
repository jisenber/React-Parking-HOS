import React, {Component} from 'react'
// import SearchInput, {createFilter} from 'react-search-input'
import {render} from 'react-dom'
import {store} from '../../index.js'
import SearchInput, {createFilter} from '../mdb/searchindex'

import emails from './Invader'

const KEYS_TO_FILTERS = ['make', 'model,', 'lic_plate', 'state', 'id']

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }

componentDidMount(){
  console.log("Getting State");
  console.log(store.getState());
  // const filteredEmails = emails.filter(createFilter(this.state.searchTerm, this.makes, ))
  // console.log(filteredEmails);
}

  render () {
    return (
      <div>

      </div>
    )
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
}

export default Search;
