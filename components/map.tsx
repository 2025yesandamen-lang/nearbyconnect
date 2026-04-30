"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
export default function Map({ users }: any) {
  return (
    <MapContainer
      center={[6.5244, 3.3792]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {users.map((user: any) => (
        <Marker key={user.id} position={[user.latitude, user.longitude]}>
          <Popup>{user.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
