import { prisma } from "@/lib/prisma";

export async function checkMutualMatch(fromId: string, toId: string) {
  const exists = await prisma.like.findFirst({
    where: { fromId: toId, toId: fromId },
  });

  return !!exists;
}

export async function createMatch(fromId: string, toId: string) {
  const roomId = crypto.randomUUID();

  return prisma.match.create({
    data: {
      userAId: fromId,
      userBId: toId,
      roomId,
    },
  });
}
