// resources/assets/js/components/NewProject.js

import axios from 'axios'
import React, { Component } from 'react'
import Select from 'react-select'


class HotelDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hotel: {
        "HOT_NAME" : '',
        "HOT_ADDRESS" : '',
        "HOT_CITY" : '',
        "HOT_STATE" : '',
        "HOT_COUNTRY" : '',
        "HOT_ZIP_CODE" : '',
        "HOT_PHONE" : '',
        "HOT_EMAIL" : ''
      },
      errors: [],
      backup:{},
      inEdit:false
    }
    this.handleEditMode = this.handleEditMode.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleUpdateHotel = this.handleUpdateHotel.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }  
  componentDidMount () {
    const hotelId = this.props.match.params.id
 
    axios.get('/api/hotel/'+hotelId).then(response => {     
      this.setState({
        hotel: response.data
      })
    }); 
  }

  handleEditMode (event) {
    this.setState({
        inEdit: true, 
        backup: this.state.hotel
    });
  }

  handleCancel (event) {
    this.setState({
        inEdit: false, 
        hotel: this.state.backup,
        backup: {}
    });

  }


  handleFieldChange (event) {
    this.setState({hotel:{...this.state.hotel, [event.target.name]: event.target.value}});
   
  }

  handleUpdateHotel (event) {
    const hotelId = this.props.match.params.id
    event.preventDefault()

    // if(){
    //   this.setState({
    //     errors: error.response.data.errors
    //   })
    // }

    const { history } = this.props

    const hotel = {
      name: this.state.hotel.HOT_NAME,
      address: this.state.hotel.HOT_ADDRESS,
      city: this.state.hotel.HOT_CITY,
      state: this.state.hotel.HOT_STATE,
      country: this.state.hotel.HOT_COUNTRY,
      zipCode: this.state.hotel.HOT_ZIP_CODE,
      phone: this.state.hotel.HOT_PHONE,
      email: this.state.hotel.HOT_EMAIL,
    }

    axios.put('/api/hotel/'+hotelId, hotel)
      .then(response => {
        // redirect to the homepage
        history.push('/')
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

  renderEditButton (){
    return ( <div><span className='btn btn-primary' onClick={this.handleEditMode}>Edit</span> </div>)
  }

  renderSaveCancelButton (){
    return (
      <div>
        <span className='btn btn-danger' onClick={this.handleCancel} >Cancel</span>
        <button className='btn btn-primary'  >Save</button>
      </div>
    )
  }


  render () {
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Hotel Details</div>
              <div className='card-body'>
                <form onSubmit={this.handleUpdateHotel}>
                  <div className='form-group'>
                    <label htmlFor='name'>name</label>
                    <input
                      id='name'
                      type='text'
                      className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                      name='HOT_NAME'
                      value={this.state.hotel.HOT_NAME}
                      onChange={this.handleFieldChange}
                      disabled={!this.state.inEdit}
                    />
                    {this.renderErrorFor('name')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='address'>Address</label>
                    <input
                      id='address'
                      type='text'
                      className={`form-control ${this.hasErrorFor('address') ? 'is-invalid' : ''}`}
                      name='HOT_ADDRESS'
                      value={this.state.hotel.HOT_ADDRESS}
                      onChange={this.handleFieldChange}
                      disabled={!this.state.inEdit}
                    />
                    {this.renderErrorFor('address')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='city'>City</label>
                    <input
                      id='city'
                      type='text'
                      className={`form-control ${this.hasErrorFor('city') ? 'is-invalid' : ''}`}
                      name='HOT_CITY'
                      value={this.state.hotel.HOT_CITY}
                      onChange={this.handleFieldChange}
                      disabled={!this.state.inEdit}
                    />
                    {this.renderErrorFor('city')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='state'>State</label>
                    <input
                      id='state'
                      type='text'
                      className={`form-control ${this.hasErrorFor('state') ? 'is-invalid' : ''}`}
                      name='HOT_STATE'
                      value={this.state.hotel.HOT_STATE}
                      onChange={this.handleFieldChange}
                      disabled={!this.state.inEdit}
                    />
                    {this.renderErrorFor('state')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='country'>Country</label>
                    <input
                      id='country'
                      type='text'
                      className={`form-control ${this.hasErrorFor('country') ? 'is-invalid' : ''}`}
                      name='HOT_COUNTRY'
                      value={this.state.hotel.HOT_COUNTRY}
                      onChange={this.handleFieldChange}
                      disabled={!this.state.inEdit}
                    />
                    {this.renderErrorFor('country')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='zipCode'>Zip Code</label>
                    <input
                      id='zipCode'
                      type='text'
                      className={`form-control ${this.hasErrorFor('zipCode') ? 'is-invalid' : ''}`}
                      name='HOT_ZIP_CODE'
                      value={this.state.hotel.HOT_ZIP_CODE}
                      onChange={this.handleFieldChange}
                      disabled={!this.state.inEdit}
                    />
                    {this.renderErrorFor('zipCode')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='phone'>Phone</label>
                    <input
                      id='phone'
                      type='text'
                      className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                      name='HOT_PHONE'
                      value={this.state.hotel.HOT_PHONE}
                      onChange={this.handleFieldChange}
                      disabled={!this.state.inEdit}
                    />
                    {this.renderErrorFor('phone')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                      id='email'
                      type='text'
                      className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                      name='HOT_EMAIL'
                      value={this.state.hotel.HOT_EMAIL}
                      onChange={this.handleFieldChange}
                      disabled={!this.state.inEdit}
                    />
                    {this.renderErrorFor('email')}
                  </div>
                  
                  {this.state.inEdit ? this.renderSaveCancelButton() : this.renderEditButton() }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HotelDetail