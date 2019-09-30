// resources/assets/js/components/ProjectsList.js

import axios from 'axios'
import React, { Component } from 'react'
import RoomBookTable from './RoomBookTable'
import RoomBookCalendar from './RoomBookCalendar'
import { Link } from 'react-router-dom'

const inputDisplayNone = {
	display: 'none'
  }

class RoomBookList extends Component {
	constructor() {

		super()
		this.state = {
			books: [],
			isCalendar: false
		}

		this.tableElement = React.createRef();
		this.calendarElement = React.createRef();
	}

	componentDidMount() {
		axios.get('/api/room-book').then(response => {
			console.log(response.data);

			this.setState({
				books: response.data
			})
			console.log('ttteeeste');
			console.log(this.tableElement);
			console.log(this.calendarElement);
			this.tableElement.current.handleSetBooks(this.state.books);

			

		})

		this.handleDeleteRoom = this.handleDeleteRoom.bind(this)
		this.handleShowModeCalendar = this.handleShowModeCalendar.bind(this)
		this.handleShowModeTable = this.handleShowModeTable.bind(this)
	
	}

	handleShowModeCalendar(){
		this.calendarElement.current.handleSetBooks(this.state.books);
		this.setState({isCalendar: true});
		
	}

	handleShowModeTable(){
		this.setState({isCalendar: false});
	}

	handleDeleteRoom(id) {
		event.preventDefault()

		const { history } = this.props
		console.log('id');
		console.log(id);


		axios.delete('/api/room-book/' + id)
			.then(response => {
				// redirect to the homepage
				axios.get('/api/room-book').then(response => {
					console.log('teste2');
					this.setState({
						books: response.data
					})
					this.tableElement.current.handleSetBooks(this.state.books);
				})
			})
			.catch(error => {
				this.setState({
					errors: error.response.data.errors
				})
			})
	}

	render() {
		const { books } = this.state
		return (
			<div className='container py-4'>
				<div className='row justify-content-center'>
					<div className='col-md-12'>
						<div className='card'>
							<div className='card-header'>Room Books</div>
							<div className='card-body'>
								<div className="row">
									<div className="col-md-6">
										<Link className='btn btn-primary btn-sm mb-3' to='/room-book-new'>
											New Room Book
										</Link>
									</div>
									<div className="col-md-6 align-self-end text-right">
										<button className='btn btn-primary mb-3' onClick={this.handleShowModeTable}>
											Table
										</button>
										<button className='btn btn-primary mb-3 ml-3' onClick={this.handleShowModeCalendar}>
											Calendar
										</button>
									</div>
								</div>
								<div style={(this.state.isCalendar)	 ? inputDisplayNone: {}}   >
									<RoomBookTable booklist={books} ref={this.tableElement} onDelete={this.handleDeleteRoom}></RoomBookTable>
								</div>
								<div style={!(this.state.isCalendar) ? inputDisplayNone: {}} >
									<RoomBookCalendar booklist={books} ref={this.calendarElement}> </RoomBookCalendar>  
								</div>
									
									
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default RoomBookList