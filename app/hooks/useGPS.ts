import { useEffect, useState } from "react";

export function useNearbyUsers(lat: number, lng: number) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!lat || !lng) return;

    fetch(`/api/users/nearby?lat=${lat}&lng=${lng}`)
      .then((res) => res.json())
      .then(setUsers);
  }, [lat, lng]);

  return users;
}