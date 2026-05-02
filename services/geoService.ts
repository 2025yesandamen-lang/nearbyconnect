export function getDistanceKm(
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

export async function getOrCreateChat(
  matchId: string,
  userId: string
) {
  try {
    const { prisma } = await import("@/lib/prisma");

    let chat = await prisma.chat.findFirst({
      where: {
        matchId,
        userId,
      },
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          matchId,
          userId,
        },
      });
    }

    return chat;
  } catch (error) {
    console.error("Failed to get or create chat:", error);
    throw error;
  }
}

export async function getChatMessages(
  chatId: string,
  limit: number = 50
) {
  try {
    const { prisma } = await import("@/lib/prisma");

    const messages = await prisma.message.findMany({
      where: { chatId },
      include: { user: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return messages.reverse();
  } catch (error) {
    console.error("Failed to get chat messages:", error);
    return [];
  }
}

export async function sendMessage(
  chatId: string,
  userId: string,
  content: string
) {
  try {
    const { prisma } = await import("@/lib/prisma");

    const message = await prisma.message.create({
      data: {
        chatId,
        userId,
        content,
      },
      include: { user: true },
    });

    return message;
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error;
  }
}
