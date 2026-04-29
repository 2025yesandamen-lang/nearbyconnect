import { stripe } from "@/services/billing/stripe";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "NearbyConnect Premium",
          },
          unit_amount: 500,
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  return Response.json({ url: session.url });
}