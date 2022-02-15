import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Event, User } from '../@types';
import { useSelector, useDispatch } from 'react-redux';
import { setButton } from '../reducer/actions/action';
import { getCookie } from '../service/servicesfunc';
function EventPage({ event }: { event: Event }) {
  console.log(event.Players);
  const user = useSelector((state: any) => state.user);
  //   const [button, setButton] = useState<string | any>('');
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
  return (
    <div className="eventpage">
      <p> location: {event.location}</p>
      <p> date :{event.date}</p>
      <p>{event.createdAt}</p>
      <p> creator :{event.creator}</p>
      <p>create at{event.createdAt}</p>
      <p>players number {event.Players.length}</p>
      <div className="players">
        players :
        {event.Players.map((player: User) => {
          return (
            <div className="player" key={player.id}>
              <p>{player.fullName}</p>
              <p>positon : {player.position}</p>,
            </div>
          );
        })}
      </div>
      <button type="button" onClick={handleClick}>
        {button}
      </button>
      <button type="button" onClick={() => navigate('/HomePage')}>
        to home page
      </button>
    </div>
  );
}

export default EventPage;
