export async function GET() {
  const features = {
    boostedSwipes: true,
    unlimitedLikes: true,
    seeWhoLikedYou: true,
    priorityMatching: true,
  };

  return Response.json(features);
}
