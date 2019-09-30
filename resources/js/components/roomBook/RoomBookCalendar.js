import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import Moment from 'react-moment';

class RoomBookCalendar extends Component {
    constructor(props) {

        super(props);
        this.state = {
            bookings: []
        }
        console.log(this.props);
    }

    componentDidMount() {
        this.handleDateClick = this.handleDateClick.bind(this)
    }
    handleDateClick(arg) { // bind with an arrow function
        console.log('aaaa');
        console.log(arg);
        alert('Event: ' + arg.event.title);
    
      }
    handleSetBooks(books) {
        console.log('books');
        console.log(books);

        let arryteste = [];
        books.map((item) => {
            let obj = {'title':'Room booked by: '+item.ROB_COSTUMER_NAME,  'start':item.ROB_DATE_START ,'end':item.ROB_DATE_END, 'color':'#7FBE96','textColor':'white'};
            arryteste.push(obj)
        })
        this.setState({bookings: arryteste});

        
    }

    render() {
        const { bookings } = this.state
        return (
            <div className='container py-4'>
            <div className='row justify-content-center'>
              < div >
                <FullCalendar eventClick={this.handleDateClick} plugins={[dayGridPlugin]}
                  events={bookings} />
              </div>
            </div>
          </div>
        )
    }
}

export default RoomBookCalendar