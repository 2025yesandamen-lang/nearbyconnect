import { prisma } from "@/lib/prisma";

export async function trackEvent(userId: string, event: string) {
  await prisma.analytics.create({
    data: {
      userId,
      event,
      createdAt: new Date(),
    },
  });
}
