import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    features: [
      "Up to 5 likes per day",
      "Basic location matching",
      "Standard messaging",
      "View profiles nearby",
    ],
  },
  {
    id: "basic",
    name: "Basic",
    price: 4.99,
    period: "monthly",
    features: [
      "Unlimited likes",
      "Advanced location matching",
      "Priority messaging",
      "See who liked you",
      "Rematch option",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 9.99,
    period: "monthly",
    features: [
      "Everything in Basic",
      "1km radius expansion",
      "Advanced filters",
      "Video profiles",
      "Ghost mode",
      "Priority support",
    ],
  },
];

export async function GET() {
  return NextResponse.json({
    plans: PRICING_PLANS,
  });
}
