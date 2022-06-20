import { query as q } from 'faunadb';
import { fauna } from '../../../../services/faunaDB';
import { stripe } from '../../../../services/stripe';

interface SubscriptionProps {
  subscriptionId: string;
  custumerId: string;
  createAction?: boolean;
}

export async function saveSubscription({
  subscriptionId,
  custumerId,
  createAction = false,
}: SubscriptionProps) {
  let userRef: '';

  try {
    userRef = await fauna.query(
      q.Select(
        'ref',
        q.Get(q.Match(q.Index('find_by_stripe_customer_id'), custumerId)),
      ),
    );
  } catch (err) {
    console.log('Error: ', err);
  }

  // Recupera as informações do subscription no Stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    user_id: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  if (createAction) {
    // Persiste as informações da subscription no faunaDB
    await fauna.query(
      q.Create(q.Collection('subscriptions'), { data: subscriptionData }),
    );
  } else {
    await fauna.query(
      // Substitui todas as informações da subscription
      q.Replace(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('find_by_subscription_id'), subscriptionId)),
        ),
        { data: subscriptionData },
      ),
    );
  }
}
