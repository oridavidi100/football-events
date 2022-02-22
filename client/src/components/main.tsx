import React, { useEffect, useState } from 'react';
// import './App.css';
import axios from 'axios';
import { setEvents } from '../reducer/actions/action';
import { Event } from '../@types';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import NotFound from './NotFound';
import Login from './Login';
import HomePage from './HomePage';
import Register from './Register';
import ForgetPassword from './ForgetPassword';
import { useSelector, useDispatch } from 'react-redux';
import EventPage from './EventPage';
import ProfilePage from './ProfilePage';
import Navbar from './Navbar';
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
      .get('http://localhost:5000/getAllEvents')
      .then(res => {
        dispatch(setEvents(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    setEventShown(events);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [button]);
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          {events &&
            events.map((event: Event) => {
              return (
                <Route
                  path={event._id}
                  element={<EventPage event={event} key={event._id} />}
                />
              );
            })}
          {/* <Route path="/:word/:partOfSpeech" element={<WordAndPos />} /> */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/HomePage"
            element={
              <HomePage eventShown={eventShown} setEventShown={setEventShown} />
            }
          />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
