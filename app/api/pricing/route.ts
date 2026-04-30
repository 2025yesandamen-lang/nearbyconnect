export async function GET() {
  return Response.json({
    free: {
      matchesPerDay: 10,
      chat: true,
      ads: true,
    },
    premium: {
      price: "$5/month",
      matchesPerDay: "unlimited",
      priorityMatching: true,
      noAds: true,
      seeWhoLikedYou: true,
    },
  });
}
