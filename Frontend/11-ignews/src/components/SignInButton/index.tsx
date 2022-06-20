import { signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import styles from './styles.module.scss';

export function SignInButton() {
  return (
    <button className={styles.signInButton} onClick={() => signIn('github')}>
      <AiFillGithub />
      <span>Login com GitHub</span>
    </button>
  );
}
