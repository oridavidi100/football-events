import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Event, User } from '../@types';
import { Link, useNavigate } from 'react-router-dom';
import './style/homePage.css';
import { setUser } from '../reducer/actions/action';
import axios from 'axios';
import { getCookie } from '../service/servicesfunc';
import { setEvents } from '../reducer/actions/action';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useRef<string | any>('');
  const date = useRef<string | any>('');
  const imgSrc = useRef<string | any>('');
  const [formclass, setFormclass] = useState<string>('createEventHide');
  const events = useSelector((state: any) => state.events);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!document.cookie) {
      navigate('/');
    }
  });

  const logout = () => {
    console.log('logout');
    document.cookie =
      'accessToken' + '=' + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
    dispatch(setUser(''));
    navigate('/');
  };

  const addEvent = async () => {
    if (formclass === 'createEventHide') {
      setFormclass('createEvent');
    } else {
      setFormclass('createEventHide');
    }
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
      };
      const res = await axios.post(
        'http://localhost:5000/Event/create',
        {
          location: location.current.value,
          date: date.current.value,
          imgSrc: imgSrc.current.value,
        },
        config
      );
      axios
        .get('http://localhost:5000/getAllEvents')
        .then(res => {
          dispatch(setEvents(res.data));
        })
        .catch(err => {
          console.log(err);
        });
      console.log(res.data);
    } catch (err: any) {
      console.log(err.response.data.error);
    }
  };
  return (
    <div className="homePage">
      <div className="homePage__header">
        hello {user.fullName}
        {''} wellcome to the home page of the best football events over the
        countery
      </div>
      <button onClick={logout}>logout</button>
      <button onClick={addEvent}>add event </button>
      <form
        onSubmit={e => {
          handlesubmit(e);
        }}
        className={formclass}
      >
        <input type="text" placeholder="location" ref={location} />
        <input type="date" placeholder="date" ref={date} />
        <input type="text" placeholder="image link" ref={imgSrc} />
        <button>create</button>
      </form>
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
