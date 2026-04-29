"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function MapView({ users }: any) {
  return (
    <MapContainer center={[6.5244, 3.3792]} zoom={13} style={{ height: "500px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {users.map((u: any) => (
        <Marker key={u.id} position={[u.latitude, u.longitude]} />
      ))}
    </MapContainer>
  );
}