"use client";

type Props = {
  user: any;
  onLike: () => void;
};

export default function SwipeCard({ user, onLike }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 20, margin: 10 }}>
      <h3>{user.name || "Unknown User"}</h3>

      <button onClick={onLike}>❤️ Like</button>
    </div>
  );
}
