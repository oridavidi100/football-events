import React, { useEffect, useRef } from 'react';
import { Event } from '../@types';
import { Link, useNavigate } from 'react-router-dom';
import './style/homePage.css';
import { setEvents } from '../reducer/actions/action';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
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
  const search = useRef<string | any>('');

  const baseUrl = useSelector((state: any) => state.baseUrl);
  let events = useSelector((state: any) => state.events);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/getAllEvents`)
      .then(res => {
        dispatch(setEvents(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    setEventShown(events);
  }, []);

  useEffect(() => {
    if (!document.cookie || !user) {
      navigate('/');
    }
  });

  const handleChange = () => {
    const searchI = search.current.value.toLocaleLowerCase();
    setEventShown(
      events.filter((event: Event) => {
        return event.location.toLocaleLowerCase().includes(searchI);
      })
    );
  };

  return (
    <div className="homePage">
      <div className="homePage__header">
        <div className="nameInHomePage">Hello {user.fullName} </div>
        <div>
          Welcome to the home page of the best football events over the countery
        </div>
        <div className="searchBar">
          <p style={{ margin: 0 }}>Search event by city </p>
          <input type="text" onChange={handleChange} ref={search}></input>
        </div>
      </div>

      <div className="eventsList">
        {eventShown &&
          eventShown.map((event: Event) => {
            return (
              <div className="event" key={event._id}>
                <p className="locationF"> {event.location}</p>
                <p>{moment(event.date).format('dddd')}</p>
                <p>
                  {moment(event.date).format('MMMM Do YYYY')} ,
                  {moment(event.date).format('HH:mm')}
                </p>
                <img
                  className="smallEventImg"
                  src={event.img}
                  alt="eventImage"
                />

                <Link
                  className="linkToDetails"
                  to={`/${event.location.replaceAll(' ', '-')}/${moment(
                    event.date
                  ).format('dddd')}/${event._id}`}
                >
                  <span className="hover-underline-animation">
                    more details
                  </span>
                  <svg
                    id="arrow-horizontal"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="10"
                    viewBox="0 0 46 16"
                  >
                    <path
                      id="Path_10"
                      data-name="Path 10"
                      d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                      transform="translate(30)"
                    ></path>
                  </svg>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
{
  /* <button class="cta">
  <span class="hover-underline-animation"> Shop now </span>
  <svg
    id="arrow-horizontal"
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="10"
    viewBox="0 0 46 16"
  >
    <path
      id="Path_10"
      data-name="Path 10"
      d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
      transform="translate(30)"
    ></path>
  </svg>
</button>; */
}
export default HomePage;
