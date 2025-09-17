import { db } from '@/firebase/fireBaseAdmin';

export const saveUserVariables = async (uid: string, variables: Record<string, string>) => {
  await db.collection('variables').doc(uid).set(variables);
};

export const getUserVariables = async (uid: string): Promise<Record<string, string>> => {
  const doc = await db.collection('variables').doc(uid).get();
  return doc.exists ? (doc.data() as Record<string, string>) : {};
};
