type User = {
  id: string;
  latitude: number | null;
  longitude: number | null;
};

function getDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function GET(req: Request) {
  const { prisma } = await import("@/lib/prisma");
  const { searchParams } = new URL(req.url);

  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  const users = await prisma.user.findMany();

  const nearby = (users as User[]).filter((u) => {
    if (u.latitude == null || u.longitude == null) return false;

    const distance = getDistanceKm(
      lat,
      lng,
      u.latitude,
      u.longitude
    );

    return distance < 2;
  });

  return Response.json(nearby);
}
