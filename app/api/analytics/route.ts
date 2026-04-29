import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.count();
  const matches = await prisma.match.count();
  const chats = await prisma.match.count();

  return Response.json({
    users,
    matches,
    chats,
    revenue: users * 1.2, // mock revenue model
  });
}