import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Event, User } from '../@types';
import { useSelector, useDispatch } from 'react-redux';
import { setButton } from '../reducer/actions/action';
import { getCookie } from '../service/servicesfunc';
import moment from 'moment';
import { setEvents } from '../reducer/actions/action';

function EventPage({ event }: { event: Event }) {
  const user = useSelector((state: any) => state.user);
  const button = useSelector((state: any) => state.button);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setDate] = useState(moment(event.date).format('DD/MM/YYYY'));
  const [time, setTime] = useState(moment(event.date).format('HH:mm'));
  useEffect((): any => {
    if (!document.cookie) {
      navigate('/');
    }
    for (let player of event.Players) {
      if (player._id === user.id) {
        return dispatch(setButton('remove'));
      }
    }
    console.log(time, date);
    return dispatch(setButton('join'));
  }, []);

  const deleteEvent = async () => {
    const config = {
      headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
    };
    try {
      const res = await axios.delete(
        'http://localhost:5000/Event/deleteEvent',
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
          data: {
            eventId: event._id,
          },
        }
      );
      console.log(res);
      navigate('/');
    } catch (err: any) {
      console.log(err.response.data.error);
    }
  };

  const hasBall = (id: string) => {
    for (let player of event.balls) {
      if (player._id === id) {
        return true;
      }
    }
    return false;
  };

  const handleClick = async () => {
    const config = {
      headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/Event/addPlayer',
        {
          eventId: event._id,
        },
        config
      );
      dispatch(setButton(res.data.button));
    } catch (err: any) {
      console.log(err.response.data.error);
    }
  };

  const bringBall = async () => {
    const config = {
      headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/Event/giveBall',
        {
          eventId: event._id,
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
    } catch (err: any) {
      console.log(err.response.data.error);
    }
  };
  console.log(event);
  return (
    <div className="eventpage">
      <div className="eventPageImgDiv">
        <img src={event.img} alt="event" className="eventPageImg" />
      </div>
      <div className="info ">
        <p className="location"> location: {event.location}</p>
        <address className="adress">
          adress:
          <a href={`https://maps.google.com/?q=${event.adress}`}>
            {event.adress}
          </a>
        </address>
        <p className="date">date :{date}</p>
        <p className="time">time :{time}</p>
        {/* <p> create at{moment(event.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p> */}
        <p className="creator"> create by :{event.creator.fullName}</p>
        <p>players ({event.Players.length}):</p>
        <div className="players">
          {event.Players.map((player: User) => {
            return (
              <div className="player" key={player._id}>
                <p>{player.fullName}</p>
                <p>positon : {player.position}</p>
                <p>{hasBall(player._id) ? '⚽' : ''}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="buttons">
        <button type="button" onClick={bringBall} className="ballButton">
          ⚽
        </button>
        <button type="button" onClick={handleClick}>
          {button}
        </button>
      </div>
      <button onClick={deleteEvent}>X</button>
    </div>
  );
}

export default EventPage;
function body(
  arg0: string,
  config: { headers: { Authorization: string } },
  body: any,
  arg3: { eventId: string }
) {
  throw new Error('Function not implemented.');
}
