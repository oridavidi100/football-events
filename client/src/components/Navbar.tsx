import React, { useEffect, useRef, useState } from 'react';
import { setUser } from '../reducer/actions/action';
import axios from 'axios';
import { getCookie } from '../service/servicesfunc';
import { setEvents } from '../reducer/actions/action';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Navbar() {
  const path = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseUrl = useSelector((state: any) => state.baseUrl);
  const location = useRef<string | any>('');
  const date = useRef<string | any>('');
  const imgSrc = useRef<string | any>('');
  const adress = useRef<string | any>('');
  const time = useRef<string | any>('');

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
      // imageHandler();
      const dateAndTime = date.current.value + ' ' + time.current.value;
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
      const res = await axios.post(
        `${baseUrl}/api/Event/create`,
        {
          // image: picture,
          location: location.current.value,
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
        <input type="text" placeholder="location" ref={location} />
        <input type="date" placeholder="date" ref={date} />
        <input type="adress" placeholder="adresss" ref={adress} />
        <input type="url" placeholder="image link" ref={imgSrc} />
        {/* <input type="file" name="image" ref={imgFile}></input>  */}
        <input type="time" placeholder="time" ref={time} />
        <button>create</button>
      </form>
    </div>
  );
}

export default Navbar;
