import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const location = useLocation();

  useEffect(() => {
    socket.emit("join");
  }, []);

  console.log(location);
  return (
    <div>
      <h1>hello chat</h1>
    </div>
  );
};

export default Chat;
