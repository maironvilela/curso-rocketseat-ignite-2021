import { signIn, useSession } from 'next-auth/react';
import Router from 'next/router';
import { api } from '../../services/axios';
import { getStripeJs } from '../../services/stripe/stripe';
import styles from './styles.module.scss';

export function SubscribeButton() {
  const { data: session } = useSession();
  async function handleSubmit() {
    if (!session) {
      signIn('github');
      return;
    }

    if (session.isSubscriptionActive) {
      Router.push('/posts');
      return;
    }

    try {
      const response = await api.post('/subscribe');
      const { sessionId } = response.data;

      const stripe = await getStripeJs();
      stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubmit}
    >
      Inscrição
    </button>
  );
}
