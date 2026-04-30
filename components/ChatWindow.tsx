"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socketClient";
import { getRoomId } from "@/lib/room";

type User = {
  id: string;
  name?: string;
};

export default function ChatWindow({
  currentUser,
  selectedUser,
}: {
  currentUser: User;
  selectedUser: User;
}) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const room = getRoomId(currentUser.id, selectedUser.id);

  useEffect(() => {
    socket.emit("join_room", { room });

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [room]);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("message", {
      room,
      text,
      senderId: currentUser.id,
    });

    setText("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* MESSAGES */}
      <div style={{ flex: 1, padding: 10, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            {m.text}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div style={{ display: "flex", padding: 10 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={sendMessage} style={{ marginLeft: 10 }}>
          Send
        </button>
      </div>
    </div>
  );
}
