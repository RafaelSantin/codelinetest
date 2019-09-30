// resources/assets/js/components/NewProject.js

import axios from 'axios'
import React, { Component } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import { parseISO, format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
const inputDisplayNone = {
  display: 'none'
}



class NewRoomBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: { 'room': '', 'costumerName': '', 'costumerEmail': '', 'dateStart': '', 'dateEnd': '' },
      rooms: [],
      errors: [],
      roomId: this.props.match.params.id,
      backup: {},
      inEdit: false,
      highlightWithRanges: []
    }
    this.handleEditMode = this.handleEditMode.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSelectChangeStart = this.handleSelectChangeStart.bind(this)
    this.handleSelectChangeEnd = this.handleSelectChangeEnd.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleCreateNewRoomBook = this.handleCreateNewRoomBook.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)

  }


  componentDidMount() {
    axios.get('/api/room').then(response => {
      let roomOptions = response.data.map((room) => {
        return { value: room.ROO_ID, label: room.ROO_NAME, name: 'room' }
      })
      this.setState({
        rooms: roomOptions
      })
    });


    if (this.state.roomId !== undefined) {
      axios.get('/api/room-book/' + this.state.roomId).then(response => {
        let bookResponse = response.data;
        console.log(bookResponse);
        let book = {
          'room': { value: bookResponse.room.ROO_ID, label: bookResponse.room.ROO_NAME, name: 'room' },
          'costumerName': bookResponse.ROB_COSTUMER_NAME,
          'costumerEmail': bookResponse.ROB_COSTUMER_EMAIL,
          'dateStart': parseISO(bookResponse.ROB_DATE_START),
          'dateEnd': parseISO(bookResponse.ROB_DATE_END),
        }

        this.setState({
          book: book
        })
      });

    }
  }

  handleEditMode(event) {
    this.setState({
      inEdit: true,
      backup: this.state.book
    });
  }

  handleCancel(event) {
    this.setState({
      inEdit: false,
      book: this.state.backup,
      backup: {}
    });
  }
  handleSelectChange(event) {
    let arrayDate = [];
    axios.get('/api/room/room-not-available-date/' + event.value).then(response => {

      response.data.book.map(function (item) {
        let startDate = new Date(item.ROB_DATE_START + 'T00:00-0800');
        let endDate = new Date(item.ROB_DATE_END + 'T00:00-0800');

        while (startDate <= endDate) {

          arrayDate.push(new Date(startDate));
          startDate.setDate(startDate.getDate() + 1);
        }


      });
      let hightlight = [
        {
          "react-datepicker__day--highlighted-custom-1":
            arrayDate
        }
      ];

      this.setState({ highlightWithRanges: hightlight });
    });

    this.setState({ book: { ...this.state.book, [event.name]: event } });

   // this.handleSelectChangeStart('');
  }

  handleSelectChangeStart(date) {
    let recieve = { ...this.state.book, dateStart: date };
    console.log(recieve);
    let recieveNew = { ...recieve, dateEnd: '' };
    console.log(recieveNew);
    this.setState({ book: recieveNew });

  }
  handleSelectChangeEnd(date) {

    this.setState({ book: { ...this.state.book, dateEnd: date } });
  }

  handleFieldChange(event) {
    console.log(this.state);
    this.setState({ book: { ...this.state.book, [event.target.name]: event.target.value } });
  }

  handleCreateNewRoomBook(event) {
    event.preventDefault()

    // if(){
    //   this.setState({
    //     errors: error.response.data.errors
    //   })
    // }

    const { history } = this.props
    const book = {
      room: this.state.book.room.value,
      costumerName: this.state.book.costumerName,
      costumerEmail: this.state.book.costumerEmail,
      dateStart: this.state.book.dateStart,
      dateEnd: this.state.book.dateEnd,
    }
    if (this.state.roomId === undefined) {
      axios.post('/api/room-book', book)
        .then(response => {
          // redirect to the homepage
          history.push('/room-book-list')
        })
        .catch(error => {
          this.setState({
            errors: error.response.data.errors
          })
        })
    } else {
      axios.put('/api/room-book/' + this.state.roomId, book)
        .then(response => {
          // redirect to the homepage
          history.push('/room-book-list')
        })
        .catch(error => {
          this.setState({
            errors: error.response.data.errors
          })
        })
    }
  }

  hasErrorFor(field) {
    return !!this.state.errors[field]
  }

  renderErrorFor(field) {
    console.log('renderErrorFor');
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

  renderEditButton() {
    return (
      <span className='btn btn-primary' onClick={this.handleEditMode}>Edit</span>
    )
  }

  renderCancelButton() {
    return (
      <span className='btn btn-danger mr-1' onClick={this.handleCancel} >Cancel</span>

    )
  }

  renderSaveButton() {
    return (
      <button className='btn btn-primary'  >Save</button>

    )
  }

  render() {
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Create new room book</div>
              <div className='card-body'>
                <form onSubmit={this.handleCreateNewRoomBook}>
                  <div className='form-group'>
                    <label htmlFor='type'>Room</label>
                    <Select
                      id="room"
                      name="room"
                      value={this.state.book.room}
                      onChange={this.handleSelectChange}
                      options={this.state.rooms}
                      isDisabled={!this.state.inEdit && this.state.roomId !== undefined}
                      required
                    />
                    <input style={inputDisplayNone} className={`form-control ${this.hasErrorFor('room') ? 'is-invalid' : ''}`} />
                    {this.renderErrorFor('room')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='dateStart'>Start Date</label>
                    <div>
                      <DatePicker
                        className={`form-control ${this.hasErrorFor('dateStart') ? 'is-invalid' : ''}`}
                        selected={this.state.book.dateStart}
                        selectsStart
                        startDate={this.state.book.dateStart}
                        highlightDates={this.state.highlightWithRanges}
                        endDate={this.state.book.dateEnd}
                        onChange={this.handleSelectChangeStart}
                        minDate={new Date()}
                        disabled={!this.state.inEdit && this.state.roomId !== undefined}
                      />
                    </div>
                    {this.renderErrorFor('dateStart')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='dateEnd'>End Date</label>
                    <div>
                      <DatePicker
                        className={`form-control ${this.hasErrorFor('dateEnd') ? 'is-invalid' : ''}`}
                        selected={this.state.book.dateEnd}
                        selectsEnd
                        minDate={new Date()}
                        highlightDates={this.state.highlightWithRanges}
                        startDate={this.state.book.dateStart}
                        endDate={this.state.book.dateEnd}
                        onChange={this.handleSelectChangeEnd}
                        minDate={this.state.book.dateStart || new Date()}
                        disabled={!this.state.inEdit && this.state.roomId !== undefined}
                      />
                    </div>
                    {this.renderErrorFor('dateEnd')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='name'>Costumer Name</label>
                    <input
                      id='costumerName'
                      type='text'
                      className={`form-control ${this.hasErrorFor('costumerName') ? 'is-invalid' : ''}`}
                      name='costumerName'
                      value={this.state.book.costumerName}
                      onChange={this.handleFieldChange}
                      disabled={!this.state.inEdit && this.state.roomId !== undefined}
                    />
                    {this.renderErrorFor('costumerName')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='name'>Costumer Email</label>
                    <input
                      id='costumerEmail'
                      type='text'
                      className={`form-control ${this.hasErrorFor('costumerEmail') ? 'is-invalid' : ''}`}
                      name='costumerEmail'
                      value={this.state.book.costumerEmail}
                      onChange={this.handleFieldChange}
                      disabled={!this.state.inEdit && this.state.roomId !== undefined}
                    />
                    {this.renderErrorFor('costumerEmail')}
                    <input style={inputDisplayNone} className={`form-control ${this.hasErrorFor('dataError') ? 'is-invalid' : ''}`} />
                    {this.renderErrorFor('dataError')}
                  </div>

                  <div>
                    {(this.state.roomId !== undefined && this.state.inEdit) ? this.renderCancelButton() : ''}
                    {(this.state.roomId === undefined || this.state.inEdit) ? this.renderSaveButton() : ''}
                    {(this.state.roomId !== undefined && !this.state.inEdit) ? this.renderEditButton() : ''}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewRoomBook