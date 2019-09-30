// resources/assets/js/components/NewProject.js

import axios from 'axios'
import React, { Component } from 'react'

class NewCapacity extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewCapacity = this.handleCreateNewCapacity.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCreateNewCapacity (event) {
    event.preventDefault()

    const { history } = this.props

    const capacity = {
      name: this.state.name
    }

    axios.post('/api/room-capacity', capacity)
      .then(response => {
        // redirect to the homepage
        history.push('/room-capacity')
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }

  hasErrorFor (field) {
    return !!this.state.errors[field]
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

  render () {
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Create new capacity</div>
              <div className='card-body'>
                <form onSubmit={this.handleCreateNewCapacity}>
                  <div className='form-group'>
                    <label htmlFor='name'>Capacity name</label>
                    <input
                      id='name'
                      type='text'
                      className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                      name='name'
                      value={this.state.name}                      
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('name')}
                  </div>
                  <button className='btn btn-primary'>Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewCapacity