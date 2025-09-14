import { db } from '@/firebase/fireBaseAdmin';

export type VariableMap = Record<string, string>;

export const getUserVariables = async (uid: string): Promise<VariableMap> => {
  const doc = await db.collection('variables').doc(uid).get();
  return doc.exists ? (doc.data() as VariableMap) : {};
};

export const saveUserVariables = async (uid: string, variables: VariableMap): Promise<void> => {
  await db.collection('variables').doc(uid).set(variables);
};
