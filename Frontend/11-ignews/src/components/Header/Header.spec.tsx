import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { mocked } from 'ts-jest/utils';
import { Header } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

jest.mock('next-auth/react');

describe('Header Component', () => {
  it(' that the component will be rendered', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'authenticated',
    });

    render(<Header />);

    screen.logTestingPlaygroundURL();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });
  it('must rendering of the signIn button when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'authenticated',
    });

    render(<Header />);

    expect(screen.getByText('Login com GitHub')).toBeInTheDocument();
  });
  it('must rendering of the signOut button when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValue({
      data: {
        user: { name: 'any_name', email: 'any_email', image: 'any_image' },
        expires: 'fake_expires',
      },
      status: 'authenticated',
    });

    const { debug } = render(<Header />);

    debug();

    expect(screen.getByText('any_name')).toBeInTheDocument();
  });
});
