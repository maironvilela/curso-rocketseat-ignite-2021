import { signOut, useSession } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import styles from './styles.module.scss';

export function SignOutButton() {
  const { data: session } = useSession();

  return (
    <div className={styles.signOutButton}>
      <AiFillGithub />
      <span>{session.user.name}</span>
      <button onClick={() => signOut()}>
        <FiLogOut />
      </button>
    </div>
  );
}
