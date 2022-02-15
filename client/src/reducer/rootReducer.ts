import { User, Event } from '../@types';
interface Action {
  type: string;
  payload: any;
}

interface InitalState {
  user: User | string;
  events: Event | string;
  button: string;
}

const initalState: InitalState = {
  user: '',
  events: '',
  button: '',
};

const rootreducer = (state = initalState, action: Action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_BUTTON':
      return { ...state, button: action.payload };
    default:
      return state;
  }
};

export default rootreducer;
