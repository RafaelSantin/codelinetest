// resources/assets/js/components/ProjectsList.js

import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class RoomList extends Component {
  constructor() {

    super()
    this.state = {
      rooms: []
    }
  }

  componentDidMount() {
    axios.get('/api/room').then(response => {
      console.log(response.data);

      this.setState({
        rooms: response.data
      })
    })

    this.handleDeleteRoom = this.handleDeleteRoom.bind(this)
  }

  handleDeleteRoom(id) {
    event.preventDefault()

    const { history } = this.props
    console.log('id');
    console.log(id);


    axios.delete('/api/room/' + id)
      .then(response => {
        // redirect to the homepage
        axios.get('/api/room').then(response => {
          console.log('teste2');
          this.setState({
            rooms: response.data
          })
        })
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }

  render() {
    const { rooms } = this.state
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>Rooms</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='/room-new'>
                  New Room
                    </Link>

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Room</th>
                      <th scope="col">Hotel</th>
                      <th scope="col">Type</th>
                      {/* <th scope="col">Capacity</th> */}
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>

                    {rooms.map(room => (
                      <tr key={room.ROO_ID}>
                        <td>{room.ROO_ID}</td>
                        <td>{room.ROO_NAME}</td>
                        <td>{room.hotel.HOT_NAME}</td>
                        <td>{room.type.ROT_NAME}</td>
                        {/* <td>{room.capacity.ROC_NAME}</td> */}
                        <td>
                          <Link className='btn btn-primary btn-sm mb-3 right' to={`/room-detail/${room.ROO_ID}`}>
                            Edit
                              </Link>
                          <span className='btn btn-danger btn-sm mb-3 right' onClick={(e) => this.handleDeleteRoom(room.ROO_ID, e)}>
                            Delete
                              </span>
                        </td>

                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RoomList