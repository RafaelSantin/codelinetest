 // resources/assets/js/components/ProjectsList.js

    import axios from 'axios'
    import React, { Component } from 'react'
    import { Link } from 'react-router-dom'

    class RoomTypeList extends Component {
      constructor () {
       
        super()
        this.state = {
          types: []
        }
      }

      componentDidMount () {
        axios.get('/api/room-type').then(response => {
          console.log('teste2');
          this.setState({
            types: response.data
          })
        })

        this.handleDeleteType = this.handleDeleteType.bind(this)
      }

      handleDeleteType (id) {
        event.preventDefault()
    
        const { history } = this.props
        console.log('id');
        console.log(id);

    
        axios.delete('/api/room-type/'+id)
          .then(response => {
            // redirect to the homepage
            axios.get('/api/room-type').then(response => {
              console.log('teste2');
              this.setState({
                types: response.data
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
        const { types } = this.state
        return (
          <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-8'>
                <div className='card'>
                  <div className='card-header'>Room Types</div>
                  <div className='card-body'>
                    <Link className='btn btn-primary btn-sm mb-3' to='/room-type-new'>
                      New Type
                    </Link>
                    <ul className='list-group list-group-flush'>
                      {types.map(type => (
                        <div  key={type.ROT_ID}
                          className='list-group-item list-group-item-action d-flex justify-content-between align-items-center '                       
                        >
                          {type.ROT_NAME}
                          
                          <div>
                            <Link className='btn btn-primary btn-sm mb-3 right'  to={`/room-type-detail/${type.ROT_ID}`}>                              
                              Edit
                            </Link>
                            <span className='btn btn-danger btn-sm mb-3 ml-1 right' onClick={(e) => this.handleDeleteType(type.ROT_ID, e)}>
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

    export default RoomTypeList