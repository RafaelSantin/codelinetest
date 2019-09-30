 // resources/assets/js/components/ProjectsList.js

    import axios from 'axios'
    import React, { Component } from 'react'
    import { Link } from 'react-router-dom'

    class HotelList extends Component {
      constructor () {
       
        super()
        this.state = {
          hotels: []
        }
      }

      componentDidMount () {
        axios.get('/api/hotel').then(response => {
          console.log('teste2');
          this.setState({
            hotels: response.data
          })
        })
      }

      render () {
        const { hotels } = this.state
        return (
          <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-8'>
                <div className='card'>
                  <div className='card-header'>Hotels</div>
                  <div className='card-body'>
                    <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                      Create new project
                    </Link>
                    <ul className='list-group list-group-flush'>
                      {hotels.map(hotel => (
                        <Link
                          className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                          to={`/hotel-detail/${hotel.HOT_ID}`}
                          key={hotel.HOT_ID}
                        >
                          {hotel.HOT_NAME}
                        </Link>
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

    export default HotelList