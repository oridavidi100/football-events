import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { User } from '../@types';
function Chat() {
  const user = useSelector((state: any) => state.user);
  const [message, setMessage] = useState<any>([]);
  const [name, setName] = useState<string>(user.fullName);
  const inputM = useRef<string | any>('');
  const socketRef = useRef<Socket>();
  useEffect(() => {
    setName(user.fullName);
    socketRef.current = io('http://localhost:5000');
    console.log('socketRef', socketRef.current);
    socketRef.current.on('messageBack', ({ name, message }) => {
      console.log(name, message);
      setMessage((prev: any) => [...prev, { name, message }]);
    });
  }, []);
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socketRef.current!.emit('message', { name, message: inputM.current.value });
  };
  return (
    <div>
      <form onSubmit={e => sendMessage(e)}>
        <input type="text" ref={inputM} />
        <button>send</button>
      </form>
      <div>
        {message.map((msg: any) => (
          <div>
            <p>{msg.name}</p>:<p>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
