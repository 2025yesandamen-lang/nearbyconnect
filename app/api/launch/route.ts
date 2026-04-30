import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email } = await req.json();

  await prisma.waitlist.create({
    data: { email },
  });

  return Response.json({ success: true });
}
