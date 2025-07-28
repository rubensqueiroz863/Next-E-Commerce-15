import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import Stripe from 'stripe';
import { IncomingHttpHeaders } from 'http';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
if (!webhookSecret) throw new Error('Missing Clerk Webhook Secret');

type EventType = 'user.created' | 'user.updated';
type Event = {
  data: EventDataType;
  object: 'event';
  type: EventType;
};

type EventDataType = {
  id: string;
  first_name: string;
  last_name: string;
  email_addresses: EmailAddressType[];
  primary_email_address_id: string;
  attributes: Record<string, string | number>;
};

type EmailAddressType = {
  id: string;
  email_address: string;
};

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();

  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-timestamp': headersList.get('svix-timestamp'),
    'svix-signature': headersList.get('svix-signature'),
  };

  const wh = new Webhook(webhookSecret);
  let evt: Event;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error('Webhook verification failed:', (err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      primary_email_address_id,
      attributes,
    } = evt.data;

    const primaryEmail = email_addresses.find(
      (email) => email.id === primary_email_address_id
    )?.email_address || '';

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2022-11-15',
    });

    const customer = await stripe.customers.create({
      name: `${first_name} ${last_name}`,
      email: primaryEmail,
    });

    await prisma.user.upsert({
      where: { externalId: id },
      create: {
        externalId: id,
        stripeCustomerId: customer.id,
        attributes: JSON.parse(JSON.stringify(attributes)), // garante compatibilidade
      },
      update: {
        attributes: JSON.parse(JSON.stringify(attributes)),
      },
    });
  }

  return NextResponse.json({}, { status: 200 });
}

// Apenas POST — webhooks são sempre POST
export const POST = handler;
