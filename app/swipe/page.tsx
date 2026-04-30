"use client";

import SwipeCard from "@/components/SwipeCard";

const users = [{ id: "1", name: "Test User" }];

export default function SwipePage() {
  const onLike = (id: string) => {
    console.log("liked", id);
  };

  return (
    <div>
      {users.map((u) => (
        <SwipeCard key={u.id} user={u} onLike={() => onLike(u.id)} />
      ))}
    </div>
  );
}
