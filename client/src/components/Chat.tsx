import React, { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
function Chat() {
  const socketRef = useRef<Socket>();
  useEffect(() => {
    socketRef.current = io('http://localhost:8000');
  }, []);
  return <div></div>;
}

export default Chat;
