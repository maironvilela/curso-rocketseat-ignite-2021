import { fireEvent, render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { signIn, useSession } from 'next-auth/react';
import Router from 'next/router';
import { SubscribeButton } from '.';

jest.mock('next-auth/react');
jest.mock('next/router', () => ({ push: jest.fn() }));

describe('SubscribeButton Component', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    render(<SubscribeButton />);
    expect(screen.getByText('Inscrição')).toBeInTheDocument();
  });

  it('redirect to signIn page when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    const signInMocked = mocked(signIn);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Inscrição');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });
  it('redirect to posts page if user has an active subscription', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: 'any_name', email: 'any_email', image: 'any_image' },
        expires: 'fake_expires',
        isSubscriptionActive: 'id_subscription',
      },
      status: 'authenticated',
    });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Inscrição');
    fireEvent.click(subscribeButton);

    expect(Router.push).toHaveBeenCalledWith('/posts');
  });
});
