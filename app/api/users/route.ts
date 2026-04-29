import { prisma } from "@/lib/prisma";
import { getDistanceKm } from "@/services/geoService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  const users = await prisma.user.findMany();

  const nearby = users.filter((u) => {
    if (!u.latitude || !u.longitude) return false;

    const distance = getDistanceKm(
      lat,
      lng,
      u.latitude,
      u.longitude
    );

    return distance <= 5; // 5km radius
  });

  return Response.json(nearby);
}
// pseudo logic
if (distance(userA, userB) < 2km) {
  allow match request
}