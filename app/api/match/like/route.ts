import { prisma } from "@/lib/prisma";
import { checkMutualMatch, createMatch } from "@/services/matchService";

export async function POST(req: Request) {
  const { fromId, toId } = await req.json();

  await prisma.like.create({
    data: { fromId, toId },
  });

  const isMatch = await checkMutualMatch(fromId, toId);

  if (isMatch) {
    const match = await createMatch(fromId, toId);

    return Response.json({
      matched: true,
      roomId: match.roomId,
    });
  }

  return Response.json({ matched: false });
}
