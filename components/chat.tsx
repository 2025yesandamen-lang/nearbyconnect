import Chat from "../../components/Chat";
"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket: any;

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/socket");
    socket = io();

    socket.on("receiveMessage", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", message);
    setMessages((prev) => [...prev, message]);
    setMessage("");
  };

  return (
    <div>
      <h2>Chat</h2>

      <div>
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}