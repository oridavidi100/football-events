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

  useEffect((): any => {
    if (!document.cookie) {
      navigate('/');
    }
    for (let player of event.Players) {
      console.log(player._id);
      if (player._id === user.id) {
        console.log('ues');
        return dispatch(setButton('remove'));
      }
    }
    return dispatch(setButton('join'));
  }, []);

  const hasBall = (id: string) => {
    console.log(id);
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
      console.log(res.data.button);
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
      console.log(res.data);
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
  if (event) {
    console.log(event);
  }

  return (
    <div className="eventpage">
      <p> location: {event.location}</p>
      <address>
        adress:
        <a href={`https://maps.google.com/?q=${event.adress}`}>
          {event.adress}
        </a>
      </address>
      <p> date :{moment(event.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <p>{moment(event.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <p> creator :{event.creator}</p>
      <p>players number {event.Players.length}</p>
      <div className="players">
        players :
        {event.Players.map((player: User) => {
          return (
            <div className="player" key={player._id}>
              <p>{player.fullName}</p>
              <p>{hasBall(player._id) ? 'bring ball' : ''}</p>
              <p>positon : {player.position}</p>,
            </div>
          );
        })}
      </div>
      <button type="button" onClick={handleClick}>
        {button}
      </button>
      <button type="button" onClick={bringBall}>
        bring ball
      </button>
    </div>
  );
}

export default EventPage;
