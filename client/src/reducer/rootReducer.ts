import { User, Event } from '../@types';
interface Action {
  type: string;
  payload: any;
}

interface InitalState {
  user: User | string;
  events: Event | string;
  button: string;
  baseUrl: string;
}

const initalState: InitalState = {
  user: '',
  events: '',
  button: '',
  baseUrl: 'http://localhost:5000',
  // baseUrl: '',
};

const rootreducer = (state = initalState, action: Action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_BUTTON':
      return { ...state, button: action.payload };
    case 'CHANGE_POS': {
      const user = state.user as User;
      user.position = action.payload;
      return { ...state, user: user };
    }
    default:
      return state;
  }
};

export default rootreducer;
