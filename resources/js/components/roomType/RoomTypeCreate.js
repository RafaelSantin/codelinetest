// resources/assets/js/components/NewProject.js

import axios from 'axios'
import React, { Component } from 'react'
import CurrencyFormat from 'react-currency-format';

class NewType extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewType = this.handleCreateNewType.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCreateNewType (event) {
    event.preventDefault()

    const { history } = this.props

    const type = {
      name: this.state.name,
      price: this.state.price
    }

    axios.post('/api/room-type', type)
      .then(response => {
        // redirect to the homepage
        history.push('/room-type')
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
              <div className='card-header'>Create new type</div>
              <div className='card-body'>
                <form onSubmit={this.handleCreateNewType}>
                  <div className='form-group'>
                    <label htmlFor='name'>Type name</label>
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
                  <div className='form-group'>
                    <label htmlFor='price'>Price</label>
                     < CurrencyFormat value = {this.state.price                     }
                     thousandSeparator = {true}
                     prefix = {'$'}
                     className = { `form-control ${this.hasErrorFor('price') ? 'is-invalid' : ''}`}
                     onValueChange = {
                         (values) => {
                             const {
                                 formattedValue,
                                 value
                             } = values;
                             // formattedValue = $2,223
                             // value ie, 2223
                             this.setState({
                                 price: value
                             })
                         }
                     }
                     />

                    {this.renderErrorFor('price')}
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

export default NewType