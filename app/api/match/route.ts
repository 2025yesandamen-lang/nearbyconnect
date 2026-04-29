import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userA, userB } = await req.json();

  const distance =
    Math.sqrt(
      (userA.lat - userB.lat) ** 2 +
      (userA.lng - userB.lng) ** 2
    );

  return NextResponse.json({
    match: distance < 0.05,
  });
}