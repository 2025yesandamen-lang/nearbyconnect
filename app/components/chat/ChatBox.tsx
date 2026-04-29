"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socketClient";
import { getRoomId } from "@/lib/room";

export default function ChatBox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // fake GPS for now (replace with real location hook)
    const lat = 6.5244;
    const lng = 3.3792;

    const roomId = getRoomId(lat, lng);

    socket.emit("join_room", roomId);

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    const lat = 6.5244;
    const lng = 3.3792;

    const roomId = getRoomId(lat, lng);

    socket.emit("send_message", {
      roomId,
      message: text,
      user: "Me",
    });

    setText("");
  };

  return (
    <div>
      <div style={{ height: 300, overflowY: "scroll", border: "1px solid #ccc" }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.user}:</b> {m.message}
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
"use client";

import { useState } from "react";
import { socket } from "@/lib/socket";

export default function ChatBox({ roomId }: { roomId: string }) {
  const [msg, setMsg] = useState("");

  const send = () => {
    socket.emit("send-message", {
      roomId,
      message: msg,
    });
    setMsg("");
  };

  return (
    <div>
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button onClick={send}>Send</button>
    </div>
  );
}