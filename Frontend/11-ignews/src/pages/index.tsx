import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from '../styles/home.module.scss';

type Product = {
  priceId: string;
  amount: string;
};

interface HomeProps {
  product: Product;
}
export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home - ig.news</title>
      </Head>

      <main className={styles.content}>
        <section className={styles.welcome}>
          <p>
            👏 <span>Ola, Bem vindo</span>
          </p>
          <h1>
            Noticias sobre o mundo <span>React</span>
          </h1>
          <p className={styles.amount_info}>
            Tenha acesso a todas as publicações{' '}
            <span>por {product.amount}/mês</span>
          </p>
        </section>
        <section className={styles.image}>
          <img src="./images/woman.svg" />
        </section>

        <SubscribeButton />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JDUniHQFojyobxreiXP9tdp', {
    expand: ['product'],
  });

  const product = {
    priceId: price.id,
    amount: (price.unit_amount / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }),
  };

  return {
    props: { product },
    revalidate: 60 * 60 * 24, //24 horas
  };
};
