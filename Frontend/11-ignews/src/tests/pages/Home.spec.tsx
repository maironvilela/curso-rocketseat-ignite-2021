import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { useSession } from 'next-auth/react';
import Home, { getStaticProps } from '../../pages';
import { stripe } from '../../services/stripe';

jest.mock('next-auth/react');
jest.mock('../../services/stripe');

describe('Home Page', () => {
  const useSessionMock = mocked(useSession);

  useSessionMock.mockReturnValueOnce({
    data: null,
    status: 'unauthenticated',
  });

  it('render page correctly', () => {
    render(
      <Home
        product={{
          priceId: 'price_id',
          amount: 'R$ 19.99',
        }}
      />,
    );

    expect(screen.getByText('Ola, Bem vindo')).toBeInTheDocument();
  });
  it('validate getStaticProps function return', async () => {
    const stripeRetrieveMocked = mocked(stripe.prices.retrieve);

    stripeRetrieveMocked.mockResolvedValueOnce({
      id: 'price_id',
      unit_amount: 9999,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'price_id',
            amount: 'R$ 99,99',
          },
        },
        revalidate: 86400,
      }),
    );
  });
});
