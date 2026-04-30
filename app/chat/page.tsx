"use client";

import { useState } from "react";
import ChatBox from "../components/chat/ChatBox";

export default function ChatPage() {
  const [roomId] = useState("demo-room");

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <ChatBox />
    </div>
  );
}
