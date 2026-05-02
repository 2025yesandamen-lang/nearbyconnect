import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId required" },
        { status: 400 }
      );
    }

    const presence = await prisma.presence.findUnique({
      where: { userId },
    });

    return NextResponse.json(
      presence || { userId, status: "offline", lastSeen: new Date() }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch presence" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { userId, status } = await req.json();

    const presence = await prisma.presence.upsert({
      where: { userId },
      update: { status, lastSeen: new Date() },
      create: { userId, status, lastSeen: new Date() },
    });

    return NextResponse.json(presence);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update presence" },
      { status: 500 }
    );
  }
}
