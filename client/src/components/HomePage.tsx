import React, { useEffect, useRef } from 'react';
import { Event } from '../@types';
import { Link, useNavigate } from 'react-router-dom';
import './style/homePage.css';
import { setEvents } from '../reducer/actions/action';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

function HomePage({
  setEventShown,
  eventShown,
}: {
  eventShown: Event[];
  setEventShown: React.Dispatch<React.SetStateAction<Event[]>>;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useRef<string | any>('');
  let events = useSelector((state: any) => state.events);
  const user = useSelector((state: any) => state.user);

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
  }, []);

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
        <div className="searchBar">
          <p>search event by city </p>
          <input type="text" onChange={handleChange} ref={search}></input>
        </div>
      </div>

      <div className="eventsList">
        {eventShown &&
          eventShown.map((event: Event) => {
            return (
              <div className="event" key={event._id}>
                <p className="locationF"> {event.location}</p>
                <p>{moment(event.date).format('dddd')}</p>
                <p>
                  {moment(event.date).format('MMMM Do YYYY')} ,
                  {moment(event.date).format('HH:MM')}
                </p>
                {/* <p>{moment(event.date).format('h:mm a')}</p> */}

                <img
                  src={event.img}
                  alt="eventImage"
                  width={100}
                  height={100}
                />
                <br />
                <Link
                  className="linkToDetails"
                  to={`/${event.location.replaceAll(' ', '-')}/${moment(
                    event.date
                  ).format('dddd')}`}
                >
                  more details
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default HomePage;
