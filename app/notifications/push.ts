export async function sendPush(title: string, message: string) {
  if (Notification.permission !== "granted") {
    await Notification.requestPermission();
  }

  new Notification(title, {
    body: message,
  });
}
