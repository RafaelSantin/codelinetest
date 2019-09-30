import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
    <div className='container'>
      <Link className='navbar-brand' to='/'>Hotels</Link>
      <Link className='navbar-brand' to='/room-type'>Room Type</Link>
      {/* <Link className='navbar-brand' to='/room-capacity'>Room Capacity</Link> */}
      <Link className='navbar-brand' to='/room-list'>Room Management</Link>
      <Link className='navbar-brand' to='/room-book-list'>Room Book</Link>
    </div>
  </nav>
)

export default Header