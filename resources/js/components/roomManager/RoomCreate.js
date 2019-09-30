// resources/assets/js/components/NewProject.js

import axios from 'axios'
import React, { Component } from 'react'
import Select from 'react-select'

const inputDisplayNone = {
  display:'none'
}

class NewRoom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      room: {'name':'', 'type':'', 'hotel':''},
      types: [],
      capacities: [],
      hotels: [],
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleCreateNewRoom = this.handleCreateNewRoom.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  
  componentDidMount () {
    axios.get('/api/hotel').then(response => {     
      let hotelOptions = response.data.map((type)=>{
        return {value:type.HOT_ID, label:type.HOT_NAME,name:'hotel'}
      }) 
      this.setState({
        hotels: hotelOptions
      })
    });
    axios.get('/api/room-type').then(response => {
      
      let typeOptions = response.data.map((type)=>{
        return {value:type.ROT_ID, label:type.ROT_NAME,name:'type'}
      })
      this.setState({
        types: typeOptions
      })
    });

    // axios.get('/api/room-capacity').then(response => {
    //   let capacityOptions = response.data.map((type)=>{
    //     return {value:type.ROC_ID, label:type.ROC_NAME,name:'capacity'}
    //   })
    //   this.setState({
    //     capacities: capacityOptions
    //   })
    // });
  }

  handleSelectChange(event) {
    console.log(this.state);
    this.setState({room:{...this.state.room, [event.name]: event}});
  }

  handleFieldChange (event) {
    console.log(this.state);
    this.setState({room:{...this.state.room, [event.target.name]: event.target.value}});
  }

  handleCreateNewRoom (event) {
    event.preventDefault()

    // if(){
    //   this.setState({
    //     errors: error.response.data.errors
    //   })
    // }

    const { history } = this.props

    const room = {
      name: this.state.room.name,
      type: this.state.room.type.value,
      // capacity: this.state.room.capacity.value,
      hotel: this.state.room.hotel.value,
    }

    axios.post('/api/room', room)
      .then(response => {
        // redirect to the homepage
        history.push('/room-list')
      })
      .catch(error => {
        console.log(error.response.data.errors);
        this.setState({
          errors: error.response.data.errors
        })
      })
  }

  hasErrorFor (field) {
    return !!this.state.errors[field]
  }

  renderErrorFor (field) {
    console.log(field);
    if (this.hasErrorFor(field)) {
      console.log(this.state.errors[field][0]);
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
              <div className='card-header'>Create new room</div>
              <div className='card-body'>
                <form onSubmit={this.handleCreateNewRoom}>
                  <div className='form-group'>
                    <label htmlFor='name'>Room name</label>
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
                  {/* <div className='form-group'>
                    <label htmlFor='capacity'>Room capacity</label>
                    <Select
                        errorText= {this.renderErrorFor('capacity')}
                        id="capacity"
                        name="capacity"
                        value={this.state.room.capacity}
                        onChange={this.handleSelectChange}
                        options={this.state.capacities}
                      />  
                    <input style={inputDisplayNone} className={`form-control ${this.hasErrorFor('capacity') ? 'is-invalid' : ''}`}/>
                    {this.renderErrorFor('capacity')}
                  </div> */}
                  <div className='form-group'>
                    <label htmlFor='type'>Room type</label>
                    <Select
                        id="type"
                        name="type"
                        value={this.state.room.type}
                        onChange={this.handleSelectChange}
                        options={this.state.types}
                        required
                      />
                      <input style={inputDisplayNone} className={`form-control ${this.hasErrorFor('type') ? 'is-invalid' : ''}`}/>
                    {this.renderErrorFor('type')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='hotel'>Room hotel</label>
                    <Select
                        id="hotel"
                        name="hotel"
                        value={this.state.room.hotel}
                        onChange={this.handleSelectChange}
                        options={this.state.hotels}
                      />
                      <input style={inputDisplayNone} className={`form-control ${this.hasErrorFor('hotel') ? 'is-invalid' : ''}`}/>
                    {this.renderErrorFor('hotel')}
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

export default NewRoom