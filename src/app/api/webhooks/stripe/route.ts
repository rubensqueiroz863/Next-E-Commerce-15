import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

async function handler(request:Request) {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature") || "";

    if (!sig) {
        return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 400 });
    }

    switch (event.type) {
        case "payment_intent.created":
            const payment_itent = event.data.object as Stripe.PaymentIntent;
            console.log("created");
            break;
        case "charge.succeeded":
            const chaerge = event.data.object as Stripe.Charge;
            if (typeof chaerge.payment_intent === "string") {
                const order = await prisma.order.update({
                    where: {paymentIntentID: chaerge.payment_intent },
                    data: { status: "complete" },
                });
            }
            break;
        default:
            console.log("Unhanded event type: ", event.type);
    }

    return NextResponse.json({}, { status: 200 });
}

export const POST = handler;