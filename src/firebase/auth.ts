import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/cordova';

import { auth } from './firebase';

interface EmailAndPasswordProps {
  email: string;
  password: string;
}

export const docreateUserWithEmailAndPassword = async ({
  email,
  password,
}: EmailAndPasswordProps) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};
