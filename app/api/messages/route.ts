import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get("chatId");

    if (!chatId) {
      return NextResponse.json(
        { error: "chatId required" },
        { status: 400 }
      );
    }

    const messages = await prisma.message.findMany({
      where: { chatId },
      include: { user: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { chatId, userId, content } = await req.json();

    const message = await prisma.message.create({
      data: {
        chatId,
        userId,
        content,
      },
      include: { user: true },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
