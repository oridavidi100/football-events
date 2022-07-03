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
  creator: Creator;
  date: string;
  img: string;
  location: string;
  _id: string;
  adress: string;
  balls: User[] | any;
}

interface Creator {
  fullName: string;
  id: string;
}

export interface ServerToClientEvents {
  messageBack: ({ name, message }: { name: string; message: string }) => void;
}

export interface ClientToServerEvents {
  message: ({
    name,
    message,
    room,
  }: {
    name: string;
    message: string;
    room: string;
  }) => void;
}
export interface City {
  english_name: string;
  lishka: string;
  name: string;
  semel_lishkat_mana: string;
  semel_moatza_ezorit: string;
  semel_napa: string;
  semel_yeshuv: string;
  shem_moaatza: string;
  shem_napa: string;
}
