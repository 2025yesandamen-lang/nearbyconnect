"use client";

import { useState } from "react";

export default function ChatBox() {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;

    console.log("send:", text);
    setText("");
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
