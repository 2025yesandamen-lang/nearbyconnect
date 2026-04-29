import { Server } from "socket.io";

export const initSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const users = new Map(); // userId -> socketId

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      users.set(userId, socket.id);
      io.emit("online-users", Array.from(users.keys()));
    });

    // 👇 Nearby chat room system
    socket.on("find-match", ({ userId, lat, lng }) => {
      socket.broadcast.emit("match-request", {
        userId,
        lat,
        lng,
      });
    });

    socket.on("accept-match", ({ from, to }) => {
      const roomId = [from, to].sort().join("-");
      socket.join(roomId);
      io.to(roomId).emit("match-created", roomId);
    });

    socket.on("send-message", ({ roomId, message }) => {
      io.to(roomId).emit("receive-message", message);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of users.entries()) {
        if (socketId === socket.id) users.delete(userId);
      }
      io.emit("online-users", Array.from(users.keys()));
    });
  });

  return io;
};