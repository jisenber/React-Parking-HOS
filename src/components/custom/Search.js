import React, {Component} from 'react'
import {render} from 'react-dom'

import {store} from '../../index.js'

// SearchInput, {createFilter} from '../../lib/index'

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
}

  render () {
    const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
      <div>
        <SearchInput className='search-input' onChange={this.searchUpdated} />
        {filteredEmails.map(email => {
          return (
            <div className='mail' key={email.id}>
              <div className='from'>{email.user.name}</div>
              <div className='subject'>{email.subject}</div>
            </div>
          )
        })}
      </div>
    )
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
}

render(<Search />, document.getElementById('search'))
