export const onlineUsers = new Map();

export function setOnline(userId: string) {
  onlineUsers.set(userId, true);
}

export function setOffline(userId: string) {
  onlineUsers.delete(userId);
}

export function isOnline(userId: string) {
  return onlineUsers.has(userId);
}
