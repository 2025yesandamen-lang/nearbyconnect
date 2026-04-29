export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  SOCKET_URL: process.env.SOCKET_URL || "http://localhost:3000",
};