import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setEvents } from '../reducer/actions/action';
import { Event } from '../@types';
import moment from 'moment';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Login from './Login';
import HomePage from './HomePage';
import Register from './Register';
import ForgetPassword from './ForgetPassword';
import { useSelector, useDispatch } from 'react-redux';
import EventPage from './EventPage';
import ProfilePage from './ProfilePage';
import Navbar from './Navbar';
import Chat from './Chat';

function App() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const button = useSelector((state: any) => state.button);
  const events = useSelector((state: any) => state.events);
  const [eventShown, setEventShown] = useState<Event[]>(events);
  useEffect(() => {
    if (events) {
      setEventShown(events);
    }
  }, [events]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/getAllEvents')
      .then(res => {
        dispatch(setEvents(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    setEventShown(events);
  }, [button]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {events &&
            events.map((event: Event) => {
              return (
                <Route
                  path={`${event.location.replaceAll(' ', '-')}/${moment(
                    event.date
                  ).format('dddd')}`}
                  element={<EventPage event={event} key={event._id} />}
                />
              );
            })}
          {/* <Route path="/:word/:partOfSpeech" element={<WordAndPos />} /> */}
          <Route path="/chat" element={<Chat eventId="" />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/HomePage"
            element={
              <HomePage eventShown={eventShown} setEventShown={setEventShown} />
            }
          />
          <Route path="/:ll" element={<NotFound />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
