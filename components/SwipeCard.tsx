export default function SwipeCard({
  user,
  onLike,
}: {
  user: any;
  onLike: () => void;
}) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: 20,
      borderRadius: 12,
      maxWidth: 300
    }}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>

      <button onClick={onLike}>❤️ Like</button>
    </div>
  );
}