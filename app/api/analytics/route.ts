export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const users = await prisma.user.count();

    return Response.json({
      users,
      matches: 0,
    });
  } catch (error) {
    console.error("Analytics error:", error);

    return Response.json(
      {
        users: 0,
        matches: 0,
        error: "Failed to fetch analytics",
      },
      { status: 500 }
    );
  }
}
