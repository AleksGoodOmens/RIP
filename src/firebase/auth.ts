import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from './firebase';

interface EmailAndPasswordProps {
  email: string;
  password: string;
}

export const doCreateUserWithEmailAndPassword = async ({
  email,
  password,
}: EmailAndPasswordProps) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async ({ email, password }: EmailAndPasswordProps) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return auth.signOut();
};
