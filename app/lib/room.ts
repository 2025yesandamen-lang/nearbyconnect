export function getRoomId(lat: number, lng: number) {
  // round coordinates to group nearby users
  const latZone = Math.round(lat * 100);
  const lngZone = Math.round(lng * 100);

  return `room_${latZone}_${lngZone}`;
}