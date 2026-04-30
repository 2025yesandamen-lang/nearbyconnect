import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.count();

  // TEMP FIX (no match table yet)
  const matches = 0;

  return Response.json({
    users,
    matches,
  });
}
