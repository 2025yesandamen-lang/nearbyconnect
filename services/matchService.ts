export async function checkMutualMatch(
  userId1: string,
  userId2: string
): Promise<boolean> {
  try {
    const { prisma } = await import("@/lib/prisma");

    const like = await prisma.like.findUnique({
      where: {
        fromId_toId: {
          fromId: userId2,
          toId: userId1,
        },
      },
    });

    return !!like;
  } catch (error) {
    console.error("Failed to check mutual match:", error);
    return false;
  }
}

export async function createMatch(
  userId1: string,
  userId2: string
): Promise<{ roomId: string; id: string }> {
  try {
    const { prisma } = await import("@/lib/prisma");

    const roomId = `room_${userId1}_${userId2}_${Date.now()}`;

    const match = await prisma.match.create({
      data: {
        userAId: userId1,
        userBId: userId2,
        roomId,
      },
    });

    return { roomId: match.roomId, id: match.id };
  } catch (error) {
    console.error("Failed to create match:", error);
    throw error;
  }
}

export async function getMatches(userId: string) {
  try {
    const { prisma } = await import("@/lib/prisma");

    const matches = await prisma.match.findMany({
      where: {
        OR: [
          { userAId: userId },
          { userBId: userId },
        ],
        active: true,
      },
      include: {
        userA: { select: { id: true, name: true, avatar: true } },
        userB: { select: { id: true, name: true, avatar: true } },
      },
    });

    return matches;
  } catch (error) {
    console.error("Failed to get matches:", error);
    return [];
  }
}
