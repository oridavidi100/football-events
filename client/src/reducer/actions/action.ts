import { Event, User } from '../../@types';
export const setEvents = (events: any) => {
  const eventArr: Event[] = [];
  for (let event of events) {
    eventArr.push({
      Players: event.Players,
      createdAt: event.createdAt,
      creator: event.creator,
      date: event.date,
      img: event.img,
      location: event.location,
      _id: event._id,
      adress: event.adress,
      balls: event.balls,
    });
  }
  eventArr.sort((a: any, b: any) => {
    const dateA: any = new Date(a.date),
      dateB: any = new Date(b.date);
    return dateA - dateB;
  });
  return { type: 'SET_EVENTS', payload: eventArr };
};

export const setUser = (user: User | string) => {
  return { type: 'SET_USER', payload: user };
};

export const setButton = (button: string) => {
  return { type: 'SET_BUTTON', payload: button };
};

export const changePos = (position: string) => {
  return { type: 'CHANGE_POS', payload: position };
};
