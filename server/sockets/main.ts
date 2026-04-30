import { Server } from "socket.io";
import { handleChat } from "../services/chatService";

export function initSocket(server: any) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("connected:", socket.id);

    socket.on("user_online", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("presence", Array.from(onlineUsers.keys()));
    });

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
    });

    socket.on("send_message", (data) => {
      handleChat(io, data);
    });

    socket.on("disconnect", () => {
      for (const [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) onlineUsers.delete(userId);
      }
      io.emit("presence", Array.from(onlineUsers.keys()));
    });
  });

  return io;
}
