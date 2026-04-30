"use client";

import { useLocation } from "@/hooks/useLocation";
export default function MapView() {
  const location = useLocation();
  if (!location) return <p>Getting GPS...</p>;
  return (
    <div>
      <h2>Live Location</h2>
      <p>Lat: {location.lat}</p>
      <p>Lng: {location.lng}</p>
    </div>
  );
}
