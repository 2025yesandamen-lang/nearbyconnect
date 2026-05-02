export async function POST(req: Request) {
  const { prisma } = await import("@/lib/prisma");
  const { email } = await req.json();

  await prisma.waitlist.create({
    data: { email },
  });

  return Response.json({ success: true });
}
