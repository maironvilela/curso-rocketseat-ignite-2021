/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { stripe } from '../../../services/stripe';
import { saveSubscription } from '../_lib/stripe/saveSubscription';

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// Desabilita o entendimento padrão do next para receber buffer ao invés do json no corpo da requisição
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let event: Stripe.Event;
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const buf = await buffer(req);

  const relevantEvents = new Set([
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.deleted',
    'customer.subscription.updated',
    'customer.created',
    'customer.deleted',
  ]);

  if (req.method === 'POST') {
    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case 'customer.subscription.deleted':
          case 'customer.subscription.updated':
            const subscription = event.data.object as Stripe.Subscription;
            await saveSubscription({
              subscriptionId: subscription.id.toString(),
              custumerId: subscription.customer.toString(),
              createAction: false,
            });
            break;
          case 'checkout.session.completed':
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;
            await saveSubscription({
              subscriptionId: checkoutSession.subscription.toString(),
              custumerId: checkoutSession.customer.toString(),
              createAction: true,
            });

            break;
          case 'customer.created':
            console.log('Enviar Email de Confirmação de cadastro');
            break;
          case 'customer.deleted':
            console.log('Enviar Email de cancelamento de cadastro');
            break;
          default:
            throw new Error('unknown event');
        }
      } catch (err) {
        // Erro de desenvolvimento
        return res.json({ error: err.message });
      }
    }

    return res.json({ received: true });
  } else {
    //informa ao front-end que so e permitido o método POST
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
};
