"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type User = {
  id: string;
  name?: string;
  latitude?: number;
  longitude?: number;
};

interface MapViewProps {
  users: User[];
}

export default function MapView({ users }: MapViewProps) {
  const [center] = useState<[number, number]>([6.5244, 3.3792]);

  useEffect(() => {
    // map initialization safe hook (optional future use)
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {users.map((user) => {
        if (!user.latitude || !user.longitude) return null;

        return (
          <Marker
            key={user.id}
            position={[user.latitude, user.longitude]}
          >
            <Popup>
              {user.name || "Unknown User"}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
