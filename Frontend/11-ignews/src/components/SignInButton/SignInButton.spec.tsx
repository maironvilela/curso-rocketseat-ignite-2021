import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { mocked } from 'ts-jest/utils';
import { SignInButton } from '.';

jest.mock('next-auth/react');
describe('SignInButton Component', () => {
  it(' must render correctly without a user authenticated', () => {
    // realiza o mock da função useSession
    const useSessionMocked = mocked(useSession);
    // Define os parametros para a próxima chamada a função
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });
    render(<SignInButton />);
    expect(screen.getByText('Login com GitHub')).toBeInTheDocument();
  });

  it(' must render correctly without a user authenticated', () => {
    // realiza o mock da função useSession
    const useSessionMocked = mocked(useSession);
    // Define os parâmetros para todas as proximas chamadas a função useSession
    useSessionMocked.mockReturnValue({
      data: {
        user: { name: 'any_name', email: 'any_email', image: 'any_image' },
        expires: 'fake_expires',
      },
      status: 'authenticated',
    });
    render(<SignInButton />);
    expect(screen.getByText('Login com GitHub')).toBeInTheDocument();
  });
});
