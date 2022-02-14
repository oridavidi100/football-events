export interface User {
  email: string;
  fullName: string;
  id: string;
  position: string | undefined;
}
export interface Event {
  Players: User[];
  createdAt: string;
  creator: string;
  date: string;
  img: string;
  location: string;
  _id: string;
}
