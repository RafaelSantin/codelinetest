  // resources/assets/js/components/App.js

  import React, { Component } from 'react'
  import ReactDOM from 'react-dom'
  import { BrowserRouter, Route, Switch } from 'react-router-dom'
  import Header from './Header'
  import HotelList from './hotel/HotelList'
  import HotelDetail from './hotel/HotelDetail';
  import RoomTypeList from './RoomType/RoomTypeList';
  import NewType from './RoomType/RoomTypeCreate';
  import RoomTypeDetail from './RoomType/RoomTypeDetail';
  import RoomCapacityList from './RoomCapacity/RoomCapacityList';
  import NewCapacity from './RoomCapacity/RoomCapacityCreate';
  import RoomCapacityDetail from './RoomCapacity/RoomCapacityDetail';
  import NewRoom from './RoomManager/RoomCreate';
  import RoomList from './RoomManager/RoomList';
  import RoomDetail from './RoomManager/RoomDetail';
  import Calendar from './Booking/calendar';
  import RoomBookTable from './RoomBook/RoomBookTable';
  import RoomBookCalendar from './RoomBook/RoomBookCalendar';
  import RoomBookList from './RoomBook/RoomBookList';
  import RoomBookCreate from './RoomBook/RoomBookCreate';
  import Login from './Login/Login';

  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggedIn: false,
        user: {}
      };
    }
    render () {
      return (
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path='/' component={HotelList} />
              <Route path='/hotel-detail/:id' component={HotelDetail} />
              <Route path='/room-capacity' component={RoomCapacityList} />
              <Route path='/room-type' component={RoomTypeList} />
              <Route path='/room-type-new' component={NewType} />
              <Route path='/room-type-detail/:id' component={RoomTypeDetail} />
              <Route path='/room-capacity' component={RoomCapacityList} />
              <Route path='/room-capacity-new' component={NewCapacity} />
              <Route path='/room-capacity-detail/:id' component={RoomCapacityDetail} />
              <Route path='/room-new' component={NewRoom} />
              <Route path='/room-list' component={RoomList} />
              <Route path='/room-detail/:id' component={RoomDetail} />
              <Route path='/calendar' component={Calendar} />
              <Route path='/room-book-list' component={RoomBookList} />
              <Route path='/room-book-new' component={RoomBookCreate} />
              <Route path='/room-book-edit/:id' component={RoomBookCreate} />
              <Route path='/login' component={Login} />
              {/* <Route path='/room-capacity' component={RoomCapacity} /> */}
            </Switch>
          </div>
        </BrowserRouter>
      )
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'))