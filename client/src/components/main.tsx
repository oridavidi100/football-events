import React, { useEffect } from 'react';
// import './App.css';
import axios from 'axios';
import { setEvents } from '../reducer/actions/action';
import { Event } from '../@types';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Login from './Login';
import HomePage from './HomePage';
import Register from './Register';
import ForgetPassword from './ForgetPassword';
import { useSelector, useDispatch } from 'react-redux';
import EventPage from './EventPage';
function App() {
  const dispatch = useDispatch();
  const button = useSelector((state: any) => state.button);
  const events = useSelector((state: any) => state.events);

  useEffect(() => {
    axios
      .get('http://localhost:5000/getAllEvents')
      .then(res => {
        dispatch(setEvents(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [button]);
  return (
    <Router>
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
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
