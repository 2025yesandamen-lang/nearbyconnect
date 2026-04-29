"use client";

import { useEffect, useState } from "react";

export default function useGPS() {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    navigator.geolocation.watchPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  return location;
}