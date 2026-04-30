import { useEffect, useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watch = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error(err),
      {
        enableHighAccuracy: true,
      }
    );

    return () => navigator.geolocation.clearWatch(watch);
  }, []);

  return location;
};
