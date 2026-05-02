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

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return NextResponse.json(
        { isPremium: false, tier: "free", features: [] },
        { status: 200 }
      );
    }

    const isPremium = subscription.tier !== "free" && subscription.status === "active";
    const isExpired = subscription.currentPeriodEnd
      ? new Date() > subscription.currentPeriodEnd
      : false;

    const features = isPremium && !isExpired
      ? {
          boostedSwipes: true,
          unlimitedLikes: true,
          seeWhoLikedYou: true,
          priorityMatching: true,
          advancedFilters: true,
        }
      : {};

    return NextResponse.json({
      isPremium: isPremium && !isExpired,
      tier: subscription.tier,
      expiresAt: subscription.currentPeriodEnd,
      features,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch premium status" },
      { status: 500 }
    );
  }
}
