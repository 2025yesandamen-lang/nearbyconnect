"use client";

import { useState } from "react";
import ChatWindow from "@/components/ChatWindow";

export default function ChatPage() {
  const [roomId] = useState("demo-room");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ChatWindow roomId={roomId} />
    </div>
  );
}