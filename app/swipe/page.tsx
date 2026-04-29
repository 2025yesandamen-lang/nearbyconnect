"use client";

import { useEffect, useState } from "react";
import SwipeCard from "@/components/SwipeCard";

export default function SwipePage() {
  const [users, setUsers] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const res = await fetch(
        `/api/users/nearby?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`
      );

      const data = await res.json();
      setUsers(data);
    });
  }, []);

  const likeUser = async () => {
    const user = users[index];

    await fetch("/api/match/like", {
      method: "POST",
      body: JSON.stringify({
        fromId: "me",
        toId: user.id,
      }),
    });

    setIndex(index + 1);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Nearby Swipe</h2>

      {users[index] ? (
        <SwipeCard user={users[index]} onLike={likeUser} />
      ) : (
        <p>No more users nearby</p>
      )}
    </div>
  );
}
