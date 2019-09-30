import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


export default class DemoApp extends React.Component {
  componentDidMount() {


    this.handleDateClick = this.handleDateClick.bind(this)
  }
  handleDateClick(arg) { // bind with an arrow function
    console.log('aaaa');
    console.log(arg);
    alert('Event: ' + arg.event.title);

  }
  render() {
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          < div className="col-md-8 center" >
            <FullCalendar eventClick={this.handleDateClick} plugins={[dayGridPlugin]}
              events={[
                { title: 'event 1', date: '2019-06-01' },
                { title: 'event 2', date: '2019-06-02' }
              ]} />
          </div>
        </div>
      </div>
    )
  }



}