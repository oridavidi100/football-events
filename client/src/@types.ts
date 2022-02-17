export interface User {
  _id: string;
  email: string;
  fullName: string;
  id: string;
  position: string | undefined;
}
export interface Event {
  Players: User[] | any;
  createdAt: string;
  creator: string;
  date: string;
  img: string;
  location: string;
  _id: string;
  adress: string;
  balls: User[] | any;
}
