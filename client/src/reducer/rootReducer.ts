import { User, Event } from '../@types';
interface Action {
  type: string;
  payload: any;
}

interface InitalState {
  user: User | undefined;
  events: Event | undefined;
}

const initalState: InitalState = {
  user: undefined,
  events: undefined,
};

const rootreducer = (state = initalState, action: Action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default rootreducer;
