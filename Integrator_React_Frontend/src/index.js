import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import { Route, BrowserRouter as Router, Routes as Switch } from 'react-router-dom';
import Home from './components/home';
import EventsList from './components/events/';
import Event from './components/events/event'
import CreateEvent from './components/events/create'
import EditEvent from './components/events/edit'
import DeleteEvent from './components/events/delete'
import LocationsList from './components/locations/';
import Location from './components/locations/location'
import Profile from './components/profiles'
import EditProfile from './components/profiles/edit'
import EditProfilePicture from './components/profiles/editpicture'
import Header from './components/header'
import Footer from './components/footer'
import Register from './components/auth/register'
import Login from './components/auth/login'
import Logout from './components/auth/logout'

const routing = (
  <Router>
    <React.StrictMode>
      <Header />
        <Switch>          
          <Route exact path="/" element={ <Home /> } />
          <Route exact path="/events" element={ <EventsList /> } />
          <Route exact path="/event/:id" element={ <Event /> } />
          <Route exact path="/event/create" element={ <CreateEvent /> } />
          <Route exact path="/event/edit/:id" element={ <EditEvent /> } />
          <Route exact path="/event/delete/:id" element={ <DeleteEvent /> } />
          <Route exact path="/locations" element={ <LocationsList /> } />
          <Route exact path="/location/:id" element={ <Location /> } />
          <Route exact path="/profile/:id" element={ <Profile /> } />
          <Route exact path="/profile/edit/:id" element={ <EditProfile /> } />
          <Route exact path="/profile/editpicture/:id" element={ <EditProfilePicture /> } />
          <Route exact path="/register" element={ <Register /> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/logout" element={ <Logout /> } />
        </Switch>
      <Footer />
    </React.StrictMode>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();