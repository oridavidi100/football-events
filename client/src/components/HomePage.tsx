import axios from 'axios';
import React, { useEffect } from 'react';
import { setEvents } from '../reducer/actions/action';
import { useSelector, useDispatch } from 'react-redux';
import { Event, User } from '../@types';
import { useNavigate } from 'react-router-dom';
function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!document.cookie) {
      navigate('/');
    }
  });
  const dispacth = useDispatch();
  useEffect(() => {
    axios
      .get('http://localhost:5000/getAllEvents')
      .then(res => {
        dispacth(setEvents(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const events = useSelector((state: any) => state.events);
  const user = useSelector((state: any) => state.user);
  if (events) {
    console.log(events);
  }
  if (user) {
    console.log(user);
  }
  return (
    <div className="homePage">
      <div className="eventsList">
        {events &&
          events.map((event: Event) => {
            return (
              <div className="event" key={event._id}>
                <p> location: {event.location}</p>
                <p> date :{event.date}</p>
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
