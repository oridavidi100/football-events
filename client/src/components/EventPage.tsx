import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Event, User } from '../@types';
import { useSelector, useDispatch } from 'react-redux';
import { setButton } from '../reducer/actions/action';
import { getCookie } from '../service/servicesfunc';
import moment from 'moment';
import { setEvents } from '../reducer/actions/action';
import Chat from './Chat';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

function EventPage({ event }: { event: Event }) {
  const baseUrl = useSelector((state: any) => state.baseUrl);
  const notyf = new Notyf();
  const user = useSelector((state: any) => state.user);
  const button = useSelector((state: any) => state.button);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [date, setDate] = useState(moment(event.date).format('DD/MM/YYYY'));
  // const [time, setTime] = useState(moment(event.date).format('HH:mm'));

  useEffect((): any => {
    if (!document.cookie) {
      navigate('/');
    }
    if (!user) {
      navigate('/');
    }
    for (let player of event.Players) {
      if (player._id === user.id) {
        return dispatch(setButton('Remove'));
      }
    }
    return dispatch(setButton('Join'));
  }, []);

  const deleteEvent = async () => {
    const config = {
      headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
    };
    try {
      const res = await axios.delete(`${baseUrl}/api/Event/deleteEvent`, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: {
          eventId: event._id,
        },
      });
      navigate('/');
    } catch (err: any) {
      notyf.error(err.response.data.error);
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
        `${baseUrl}/api/Event/addPlayer`,
        {
          eventId: event._id,
        },
        config
      );
      dispatch(setButton(res.data.button));
    } catch (err: any) {
      notyf.error(err.response.data.error);
    }
  };

  const bringBall = async () => {
    const config = {
      headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
    };
    try {
      const res = await axios.post(
        `${baseUrl}/api/Event/giveBall`,
        {
          eventId: event._id,
        },
        config
      );
      axios
        .get(`${baseUrl}/api/getAllEvents`)
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
  console.log(moment(event.date).format('HH:mm'));

  return (
    <div className="eventpage">
      <div className="ChatDiv">
        <Chat eventId={event._id} />
      </div>
      <div className="info ">
        <div className="detailsPage">
          <p className="location"> Location: {event.location}</p>
          <p className="adress">
            Address:
            <a href={`https://maps.google.com/?q=${event.adress}`}>
              {event.adress}
            </a>
          </p>
          <p className="date">
            Date :{moment(event.date).format('DD/MM/YYYY')}
          </p>
          <p className="time">Time :{moment(event.date).format('HH:mm')}</p>
          <p className="creator"> Created by :{event.creator.fullName}</p>
          <p>Players ({event.Players.length}):</p>
          <div className="players">
            {event.Players.map((player: User) => {
              return (
                <div className="player" key={player._id}>
                  <p>{player.fullName}</p>
                  <p>Positon : {player.position}</p>
                  <p>{hasBall(player._id) ? '⚽' : ''}</p>
                </div>
              );
            })}
          </div>
          <div className="buttons">
            <button type="button" onClick={bringBall} className="ballButton">
              ⚽
            </button>
            <button type="button" onClick={handleClick}>
              {button}
            </button>
            <button onClick={deleteEvent}>Delete Event</button>
          </div>
        </div>
        <div className="eventPageImgDiv">
          <img src={event.img} alt="event" className="eventPageImg" />
        </div>
      </div>
    </div>
  );
}

export default EventPage;
