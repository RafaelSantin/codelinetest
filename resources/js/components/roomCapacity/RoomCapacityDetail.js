import axios from 'axios'
import React, { Component } from 'react'

class RoomCapacityDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
        capacity: {},
        inEdit: false,
        errors: [],
        backup:{}
    }

    this.handleEditMode = this.handleEditMode.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleUpdateCapacity = this.handleUpdateCapacity.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }
  
  handleEditMode (event) {
    this.setState({
        inEdit: true, 
        backup: this.state.capacity
    });
  }

  handleCancel (event) {
    this.setState({
        inEdit: false, 
        capacity: this.state.backup,
        backup: {}
    });
  }
  handleFieldChange (event) {

    this.setState({capacity:{...this.state.capacity, [event.target.name]: event.target.value}});
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

  handleUpdateCapacity (event) {
    event.preventDefault()
    const capacityId = this.props.match.params.id

    //const { history } = this.props

    const capacity = {
      name: this.state.capacity.ROC_NAME
    }

    axios.put('/api/room-capacity/'+capacityId, capacity)
      .then(response => {
        // redirect to the homepage
        
        this.setState({
            capacity: response.data,
            inEdit:false
          })
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }

  componentDidMount () {
    const capacityId = this.props.match.params.id

    axios.get(`/api/room-capacity/${capacityId}`).then(response => {
        console.log(response.data);
      this.setState({
        capacity: response.data
      })
    })
  }

  renderEditInput () {
    return <div>
                <div>
                    <input
                        id='name'
                        type='text'
                        className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                        name='ROC_NAME'
                        maxLength='50'
                        value={this.state.capacity.ROC_NAME}
                        onChange={this.handleFieldChange}
                    />
                </div>
                <div>
                    <button className='btn btn-danger btn-sm mb-3 right' onClick={this.handleCancel}>
                        Cancel
                    </button>  <button className='btn btn-primary btn-sm mb-3 right' onClick={this.handleUpdateCapacity}>
                        Save
                    </button>
                </div>
            </div>
  }

  renderOnlyText ()  {
    return <div> 
                <div>
                    <p>
                        {this.state.capacity.ROC_NAME}
                    </p>
                </div>
                <div>
                    <button className='btn btn-primary btn-sm mb-3 right' onClick={this.handleEditMode}>
                        Edit
                    </button>
                </div>
            </div>
  }

  render () { 
    return (
        <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>Room Capacity</div>
              <div className='card-body'>
                {this.state.inEdit ? this.renderEditInput() : this.renderOnlyText()}
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RoomCapacityDetail