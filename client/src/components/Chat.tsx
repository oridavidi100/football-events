import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
function Chat({ eventId }: { eventId: string }) {
  const user = useSelector((state: any) => state.user);
  const [message, setMessage] = useState<any>([]);
  const [name, setName] = useState<string>(user.email);
  const inputM = useRef<string | any>('');
  const socketRef = useRef<Socket>();

  useEffect(() => {
    setName(user.email);
    const res = axios
      .get(`http://localhost:5000/allMessages/${eventId}`)
      .then(res => {
        setMessage(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    socketRef.current = io('http://localhost:5000');
    socketRef.current!.emit('join', {
      room: eventId,
    });
    socketRef.current.on('messageBack', ({ name, message }) => {
      console.log(name, message);
      setMessage((prev: any) => [...prev, { name, message }]);
    });
  }, []);
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(eventId);
    socketRef.current!.emit('message', {
      name,
      message: inputM.current.value,
      room: eventId,
    });
    inputM.current.value = '';
  };
  return (
    <div className="chat">
      <div>
        {message.map((msg: any) => (
          <div>
            <p>{msg.name}</p>:<p>{msg.message}</p>
          </div>
        ))}
      </div>
      <form onSubmit={e => sendMessage(e)}>
        <input type="text" ref={inputM} />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default Chat;
