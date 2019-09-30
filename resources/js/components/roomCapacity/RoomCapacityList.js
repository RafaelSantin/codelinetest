 // resources/assets/js/components/ProjectsList.js

    import axios from 'axios'
    import React, { Component } from 'react'
    import { Link } from 'react-router-dom'

    class RoomCapacityList extends Component {
      constructor () {
       
        super()
        this.state = {
          capacities: []
        }
      }

      componentDidMount () {
        axios.get('/api/room-capacity').then(response => {
          console.log('teste2');
          this.setState({
            capacities: response.data
          })
        })

        this.handleDeleteCapacity = this.handleDeleteCapacity.bind(this)
      }

      handleDeleteCapacity  (id) {
        event.preventDefault()
    
        const { history } = this.props
        console.log('id');
        console.log(id);

    
        axios.delete('/api/room-capacity/'+id)
          .then(response => {
            // redirect to the homepage
            axios.get('/api/room-capacity').then(response => {
              console.log('teste2');
              this.setState({
                capacities: response.data
              })
            })
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
            })
          })
      }

      render () {
        const { capacities } = this.state
        return (
          <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-8'>
                <div className='card'>
                  <div className='card-header'>Room Capacity</div>
                  <div className='card-body'>
                    <Link className='btn btn-primary btn-sm mb-3' to='/room-capacity-new'>
                      New Capacity
                    </Link>
                    <ul className='list-group list-group-flush'>
                      {capacities.map(capacity => (
                        <div  key={capacity.ROC_ID}
                          className='list-group-item list-group-item-action d-flex justify-content-between align-items-center '                       
                        >
                          {capacity.ROC_NAME}
                          
                          <div>
                            <Link className='btn btn-primary btn-sm mb-3 right'  to={`/room-capacity-detail/${capacity.ROC_ID}`}>                              
                              Edit
                            </Link>
                            <span className='btn btn-danger btn-sm mb-3 right' onClick={(e) => this.handleDeleteCapacity(capacity.ROC_ID, e)}>
                              Delete
                            </span>
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

    export default RoomCapacityList