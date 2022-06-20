import { useSession } from 'next-auth/react';
import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';
import { SignOutButton } from '../SignOutButton';
import styles from './styles.module.scss';

export function Header() {
  const { data: session } = useSession();
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <img src="/images/logo.svg" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>

          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        {session ? <SignOutButton /> : <SignInButton />}
      </div>
    </header>
  );
}
