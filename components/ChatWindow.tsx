"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

export default function ChatWindow({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("join-match-room", roomId);

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, [roomId]);

  const send = () => {
    socket.emit("send-message", {
      roomId,
      message: text,
    });

    setText("");
  };

  return (
    <div style={{ width: "100%", padding: 20 }}>
      <div style={{ height: 400, overflowY: "scroll" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ padding: 5 }}>
            💬 {m}
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "80%" }}
      />

      <button onClick={send}>Send</button>
    </div>
  );
}