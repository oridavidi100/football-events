import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Event } from '../@types';
import { Link, useNavigate } from 'react-router-dom';
import './style/homePage.css';

import moment from 'moment';

function HomePage({
  setEventShown,
  eventShown,
}: {
  eventShown: Event[];
  setEventShown: React.Dispatch<React.SetStateAction<Event[]>>;
}) {
  const navigate = useNavigate();
  const search = useRef<string | any>('');
  let events = useSelector((state: any) => state.events);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!document.cookie || !user) {
      navigate('/');
    }
  });

  const handleChange = () => {
    const searchI = search.current.value.toLocaleLowerCase();
    setEventShown(
      events.filter((event: Event) => {
        return event.location.toLocaleLowerCase().includes(searchI);
      })
    );
  };

  return (
    <div className="homePage">
      <div className="homePage__header">
        hello {user.fullName}
        {''} wellcome to the home page of the best football events over the
        countery
      </div>

      <p>search event by city </p>
      <input type="text" onChange={handleChange} ref={search}></input>

      <div className="eventsList">
        {eventShown &&
          eventShown.map((event: Event) => {
            return (
              <div className="event" key={event._id}>
                <p> location: {event.location}</p>
                <p>
                  {' '}
                  date :{moment(event.date).format('MMMM Do YYYY, h:mm:ss a')}
                </p>
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
