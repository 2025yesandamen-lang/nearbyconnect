const onlineUsers = new Set<string>();

export async function POST(req: Request) {
  const { userId, status } = await req.json();

  if (status === "online") {
    onlineUsers.add(userId);
  } else {
    onlineUsers.delete(userId);
  }

  return Response.json({
    online: Array.from(onlineUsers),
  });
}
