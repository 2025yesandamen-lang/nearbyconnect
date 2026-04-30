"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
export default function MapView({ users }: { users: any[] }) {
  return (
    <MapContainer
      center={[6.5244, 3.3792] as [number, number]}
      zoom={13}
      style={{ height: "500px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {users.map((u: any, i: number) => (
        <Marker key={i} position={[u.latitude, u.longitude]}>
          <Popup>{u.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
