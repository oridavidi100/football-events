import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Event, User } from '../@types';
import { Link, useNavigate } from 'react-router-dom';
import './style/homePage.css';
import { setUser } from '../reducer/actions/action';
import axios from 'axios';
import { getCookie } from '../service/servicesfunc';
import { setEvents } from '../reducer/actions/action';
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
  const location = useRef<string | any>('');
  const date = useRef<string | any>('');
  const imgSrc = useRef<string | any>('');
  const adress = useRef<string | any>('');
  const search = useRef<string | any>('');
  const time = useRef<string | any>('');
  const [formclass, setFormclass] = useState<string>('createEventHide');
  let events = useSelector((state: any) => state.events);
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    if (!document.cookie || !user) {
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

  const addEvent = () => {
    if (formclass === 'createEventHide') {
      setFormclass('createEvent');
    } else {
      setFormclass('createEventHide');
    }
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const dateAndTime = date.current.value + ' ' + time.current.value;
      const config = {
        headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
      };
      const res = await axios.post(
        'http://localhost:5000/Event/create',
        {
          location: location.current.value,
          date: dateAndTime,
          imgSrc: imgSrc.current.value,
          adress: adress.current.value,
        },
        config
      );
      axios
        .get('http://localhost:5000/getAllEvents')
        .then(res => {
          dispatch(setEvents(res.data));
        })
        .catch(err => {
          console.log(err.response.data.error);
        });
      addEvent();
      location.current.value = '';
      date.current.value = '';
      imgSrc.current.value = '';
      adress.current.value = '';
      console.log(res.data);
    } catch (err: any) {
      console.log(err.response.data.error);
    }
  };

  const handleChange = () => {
    const searchI = search.current.value.toLocaleLowerCase();
    console.log(searchI);
    setEventShown(
      events.filter((event: Event) => {
        console.log(event.location.toLocaleLowerCase());
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
      <nav>
        <button onClick={logout}>logout</button>
        <button onClick={addEvent}>add event </button>
        <button
          onClick={() => {
            navigate('/profile');
          }}
        >
          profile
        </button>
      </nav>
      <form
        onSubmit={e => {
          handlesubmit(e);
        }}
        className={formclass}
      >
        <input type="text" placeholder="location" ref={location} />
        <input type="date" placeholder="date" ref={date} />
        <input type="adress" placeholder="adresss" ref={adress} />
        <input type="url" placeholder="image link" ref={imgSrc} />
        <input type="time" placeholder="time" ref={time} />
        <button>create</button>
      </form>

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
