import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Event, User } from '../@types';
function EventPage({ event }: { event: Event }) {
  console.log(event.Players);
  const navigate = useNavigate();
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts: any = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
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
        join
      </button>
      <button type="button" onClick={() => navigate('/HomePage')}>
        to home page
      </button>
    </div>
  );
}

export default EventPage;
