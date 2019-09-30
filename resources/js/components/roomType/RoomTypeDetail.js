import axios from 'axios'
import React, { Component } from 'react'
import CurrencyFormat from 'react-currency-format';

class RoomTypeDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
        type: {ROT_NAME:'', ROT_PRICE:''},
        inEdit: false,
        errors: [],
        backup:{}
    }

    this.handleEditMode = this.handleEditMode.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleUpdateType = this.handleUpdateType.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }
  
  handleEditMode (event) {
    this.setState({
        inEdit: true, 
        backup: this.state.type
    });
  }

  handleCancel (event) {
    this.setState({
        inEdit: false, 
        type: this.state.backup,
        backup: {}
    });
  }
  handleFieldChange (event) {

    this.setState({type:{...this.state.type, [event.target.name]: event.target.value}});
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

  handleUpdateType (event) {
    event.preventDefault()
    const typeId = this.props.match.params.id

    const { history } = this.props

    const type = {
      name: this.state.type.ROT_NAME
    }

    axios.put('/api/room-type/'+typeId, type)
      .then(response => {
        // redirect to the homepage
        
        this.setState({
            type: response.data,
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
    const typeId = this.props.match.params.id

    axios.get(`/api/room-type/${typeId}`).then(response => {
        console.log(response.data);
      this.setState({
        type: response.data
      })
    })
  }

  renderSaveCancelButton() {
    return <div>                 
                <div>
                    <button className='btn btn-danger btn-sm mb-3 right' onClick={this.handleCancel}>
                        Cancel
                    </button>  <button className='btn btn-primary btn-sm mb-3 right' onClick={this.handleUpdateType}>
                        Save
                    </button>
                </div>
            </div>
  }

  renderEditButton() {
    return <div>               
              <button className='btn btn-primary btn-sm mb-3 right' onClick={this.handleEditMode}>
                  Edit
              </button>          
            </div>
  }

  render () { 
    return (
        <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>Room Type</div>
              <div className='card-body'>
                <div className='form-group'>
                    <label htmlFor='price'>Type Name</label>
                      <input
                        id='name'
                        type='text'
                        className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                        name='ROT_NAME'
                        maxLength='50'
                        value={this.state.type.ROT_NAME}
                        onChange={this.handleFieldChange}
                         disabled={!this.state.inEdit}
                    />
                    {this.renderErrorFor('name')}
                </div>
                <div className='form-group'>
                    <label htmlFor='price'>Price</label>
                     < CurrencyFormat value = {this.state.type.ROT_PRICE}
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
                                 type: {
                                     ...this.state.type,
                                     ROT_PRICE: value
                                 }
                             })
                         }
                     }
                     disabled={!this.state.inEdit}
                     />

                    {this.renderErrorFor('price')}
                  </div>

                 {this.state.inEdit ? this.renderSaveCancelButton() : this.renderEditButton() }
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RoomTypeDetail