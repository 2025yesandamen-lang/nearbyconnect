import { NextResponse } from "next/server";

let messages: any[] = [];

export async function POST(req: Request) {
  const body = await req.json();
  messages.push(body);

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(messages);
}