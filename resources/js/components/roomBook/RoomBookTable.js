import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Moment from 'react-moment';

class RoomBookTable extends Component {
  constructor(props) {

    super(props);
		this.state = {
			books: this.props.booklist
    }
    console.log(this.props);
	}

	componentDidMount() {
		this.handleDeleteRoom =  this.handleDeleteRoom.bind(this)
  }

  handleSetBooks(books){
    console.log('books');
    console.log(books);
    this.setState({books:books});
  }

	handleDeleteRoom(id) {
		console.log('bbb');
		if (typeof this.props.onDelete === 'function') {
			console.log('aaaa');
				this.props.onDelete(id);
		}
	}

	render() {
		const { books } = this.state
		return (
						<table className="table table-striped">
							<thead>
								<tr>
									<th scope="col">Room</th>
									<th scope="col">Costumer</th>
									<th scope="col">Begin</th>
									<th scope="col">End</th>
									{/* <th scope="col">Capacity</th> */}
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								{books.map(book => (
									<tr key={book.ROB_ID}>
										<td>{book.room.ROO_NAME}</td>
										<td>{book.ROB_COSTUMER_NAME}</td>
										<td>
											<Moment format="YYYY/MM/DD">
												{book.ROB_DATE_START}
											</Moment>
										</td>
										<td>
											<Moment format="YYYY/MM/DD">
												{book.ROB_DATE_END}
											</Moment>												
										</td>
										{/* <td>{room.capacity.ROC_NAME}</td> */}
										<td>
											<Link className='btn btn-primary btn-sm mb-3 right' to={`/room-book-edit/${book.ROB_ID}`}>
												Edit
																		</Link>
											<span className='btn btn-danger btn-sm mb-3 ml-1 right' onClick={(e) => this.handleDeleteRoom(book.ROB_ID, e)}>
												Delete
																			</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
		
		)
	}
}

export default RoomBookTable