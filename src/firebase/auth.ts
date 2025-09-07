import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

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

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const doSignOut = () => {
  return auth.signOut();
};
