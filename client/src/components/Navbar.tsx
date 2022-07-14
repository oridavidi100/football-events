import React, { useEffect, useRef, useState } from 'react';
import { setUser } from '../reducer/actions/action';
import axios from 'axios';
import moment from 'moment';

import citiesJson from '../service/cities.json';
import { City } from '../@types';
import { getCookie } from '../service/servicesfunc';
import { setEvents } from '../reducer/actions/action';

import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Notyf } from 'notyf';

function Navbar() {
  const path = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notyf = new Notyf();

  const baseUrl = useSelector((state: any) => state.baseUrl);

  const location = useRef<string | any>('');
  const date = useRef<string | any>('');
  const imgSrc = useRef<string | any>('');
  const adress = useRef<string | any>('');
  const time = useRef<string | any>('');
  const city = useRef<string | any>('');

  const [citiesFiltered, setCitiesFiltered] = useState<City[]>(citiesJson);

  const [formclass, setFormclass] = useState<string>('createEventHide');
  const [navClass, setNavClass] = useState<string>('');

  useEffect(() => {
    if (
      path.pathname === '/' ||
      path.pathname === '/register' ||
      path.pathname === '/forgetpassword'
    ) {
      setNavClass('navbar');
    } else {
      setNavClass('');
    }
  });

  const logout = () => {
    document.cookie =
      'accessToken' + '=' + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
    dispatch(setUser(''));
    navigate('/');
  };

  // hide or show the add event option

  const addEvent = () => {
    if (formclass === 'createEventHide') {
      setFormclass('createEvent');
    } else {
      setFormclass('createEventHide');
    }
  };

  //filter city

  const filterCity = () => {
    const str: string = location.current.value;
    setCitiesFiltered(
      citiesJson.filter((city: City) => {
        return city.english_name.toLowerCase().includes(str);
      })
    );
  };

  // submit new event

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // imageHandler();
      const now: string | Date = moment().format();
      const dateAndTime = date.current.value + ' ' + time.current.value;
      if (Date.parse(dateAndTime) - Date.parse(now) < 0) {
        return notyf.error('The date you chosed has passed');
      }
      let imageUrl;
      if (imgSrc.current.value === '') {
        imageUrl =
          'https://mumonarchs.com/images/2021/3/1/facilities_SOC_Duggins_aerial_lighted_DJI_0237_edited.jpg?width=600&height=360&mode=crop';
      } else {
        imageUrl = imgSrc.current.value;
      }
      const config = {
        headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
      };
      const cityUpperCase = city.current.value.replaceAll(
        /\S*/g,
        (word: any) => `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`
      );

      const res = await axios.post(
        `${baseUrl}/api/Event/create`,
        {
          // image: picture,
          location: cityUpperCase,
          date: dateAndTime,
          imgSrc: imageUrl,
          adress: adress.current.value,
        },
        config
      );
      axios
        .get(`${baseUrl}/api/getAllEvents`)
        .then(res => {
          dispatch(setEvents(res.data));
        })
        .catch(err => {});
      addEvent();
      location.current.value = '';
      date.current.value = '';
      imgSrc.current.value = '';
      adress.current.value = '';
      time.current.value = '';
    } catch (err: any) {}
  };
  return (
    <div className={navClass}>
      <nav className="nav">
        <ul>
          <li>
            <button
              className="navbarBtn"
              type="button"
              onClick={() => navigate('/HomePage')}
            >
              Home page
            </button>
          </li>
          <li>
            <button className="navbarBtn" onClick={addEvent}>
              Add event{' '}
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigate('/profile');
              }}
              className="navbarBtn"
            >
              Profile
            </button>
          </li>
          <li className="logoutLi">
            <button className="logoutBtn" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <form
        onSubmit={e => {
          handlesubmit(e);
        }}
        className={formclass}
      >
        <div className="Xdiv">
          <button onClick={addEvent} className="XButton">
            X
          </button>
        </div>

        <input
          type="text"
          placeholder="City"
          ref={location}
          required={true}
          list="cities"
          onChange={filterCity}
        />
        <select id="cities" ref={city}>
          {citiesFiltered.map((city: City) => {
            return (
              <option value={city.english_name}>{city.english_name}</option>
            );
          })}
        </select>
        <input type="date" placeholder="date" ref={date} required={true} />
        <input
          type="adress"
          placeholder="adresss"
          ref={adress}
          required={true}
        />
        <input type="url" placeholder="image link" ref={imgSrc} />
        <input type="time" placeholder="time" ref={time} required={true} />
        <button>create</button>
      </form>
    </div>
  );
}

export default Navbar;
