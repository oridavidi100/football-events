import React, { useEffect, useRef, useState } from 'react';
import { setUser } from '../reducer/actions/action';
import axios from 'axios';
import { getCookie } from '../service/servicesfunc';
import { setEvents } from '../reducer/actions/action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useRef<string | any>('');
  const date = useRef<string | any>('');
  const imgSrc = useRef<string | any>('');
  const adress = useRef<string | any>('');

  const time = useRef<string | any>('');
  const [formclass, setFormclass] = useState<string>('createEventHide');

  const logout = () => {
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
      if (imgSrc.current.value === '') {
        imgSrc.current.value =
          'https://mumonarchs.com/images/2021/3/1/facilities_SOC_Duggins_aerial_lighted_DJI_0237_edited.jpg?width=600&height=360&mode=crop';
      }
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
    } catch (err: any) {
      console.log(err.response.data.error);
    }
  };
  return (
    <div className="navbar">
      <nav className="nav">
        <ul>
          <li>
            <button type="button" onClick={() => navigate('/HomePage')}>
              home page
            </button>
          </li>
          <li>
            <button onClick={addEvent}>add event </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigate('/profile');
              }}
            >
              profile
            </button>
          </li>
          <button onClick={logout}>logout</button>
          <li></li>
        </ul>
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
    </div>
  );
}

export default Navbar;
