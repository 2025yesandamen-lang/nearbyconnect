export function handleChat(io: any, data: any) {
  const { roomId, message, user } = data;

  io.to(roomId).emit("receive_message", {
    message,
    user,
    time: new Date(),
  });
}