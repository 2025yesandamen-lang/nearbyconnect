"use client";

import { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";

type User = {
  id: string;
  name?: string;
};

export default function Chat({ currentUser }: { currentUser: User }) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* USER LIST */}
      <div style={{ width: "30%", borderRight: "1px solid #ddd" }}>
        {users.map((u) => (
          <div
            key={u.id}
            onClick={() => setSelectedUser(u)}
            style={{
              padding: 10,
              cursor: "pointer",
              background: selectedUser?.id === u.id ? "#eee" : "transparent",
            }}
          >
            {u.name || "Unknown User"}
          </div>
        ))}
      </div>

      {/* CHAT WINDOW */}
      <div style={{ flex: 1 }}>
        {selectedUser ? (
          <ChatWindow
            currentUser={currentUser}
            selectedUser={selectedUser}
          />
        ) : (
          <div style={{ padding: 20 }}>Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
}
