"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

export default function MapView() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("online-users", (data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div>
      <h2>Live Users Map</h2>
      {users.map((u, i) => (
        <div key={i}>User: {u}</div>
      ))}
    </div>
  );
}