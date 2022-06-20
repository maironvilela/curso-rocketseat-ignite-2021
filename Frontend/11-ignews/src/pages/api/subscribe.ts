import { query as q } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { fauna } from '../../services/faunaDB';
import { stripe } from '../../services/stripe';

type User = {
  stripeCustomerId: string;
  ref: {
    id: string;
  };
};
export default async (request: NextApiRequest, response: NextApiResponse) => {
  let stripeCustumerId = '';
  // Verifica se o método utilizado é o POST
  if (request.method === 'POST') {
    // carregar as informações do usuário no cookies da aplicação
    const session = await getSession({ req: request });

    // busca os dados do usuário no banco de dados

    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index('find_by_email'), q.Casefold(session.user.email))),
    );

    // verifica se o usuário possui a propriedade custumerId
    if (!user.stripeCustomerId) {
      const stripeCustumer = await stripe.customers.create({
        email: session.user.email,
      });

      await fauna.query(
        q.Update(q.Ref(q.Collection('users'), user.ref.id), {
          data: {
            stripeCustomerId: stripeCustumer.id,
          },
        }),
      );
      stripeCustumerId = stripeCustumer.id;
    } else {
      stripeCustumerId = user.stripeCustomerId;
    }

    // criar uma sessão no Stripe
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustumerId,
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_URL_SUCCESS,
      cancel_url: process.env.STRIPE_URL_CANCEL,
      // metodos de pagamentos
      payment_method_types: ['card'],
      // Especifique se o Checkout deve coletar o endereço de cobrança do cliente
      billing_address_collection: 'required',
      line_items: [{ price: 'price_1JDUniHQFojyobxreiXP9tdp', quantity: 1 }],
      // Pagamento (subscription: recorrente )
      mode: 'subscription',
      // Permite cupons de desconto
    });
    return response.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    //informa ao front-end que so e permitido o método POST
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method not allowed');
  }

  //Recuperar o usuário logado através dos cookies
};
