"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Startup Dashboard</h1>

      <div>
        <p>Users: {stats.users}</p>
        <p>Matches: {stats.matches}</p>
        <p>Chats: {stats.chats}</p>
        <p>Revenue: ${stats.revenue}</p>
      </div>
    </div>
  );
}