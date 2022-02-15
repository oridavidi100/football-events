import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Event, User } from '../@types';
import { Link, useNavigate } from 'react-router-dom';
import './style/homePage.css';
function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!document.cookie) {
      navigate('/');
    }
  });
  const dispacth = useDispatch();

  const events = useSelector((state: any) => state.events);
  const user = useSelector((state: any) => state.user);
  if (events) {
    console.log(events);
  }
  if (user) {
    console.log(user);
  }
  return (
    <div className="homePage">
      <div className="eventsList">
        {events &&
          events.map((event: Event) => {
            return (
              <div className="event" key={event._id}>
                <p> location: {event.location}</p>
                <p> date :{event.date}</p>
                <Link to={`/${event._id}`}>more details</Link>

                <img
                  src={event.img}
                  alt="eventImage"
                  width={100}
                  height={100}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default HomePage;
