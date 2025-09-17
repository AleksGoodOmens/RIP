export const fetchVariables = async (uid: string): Promise<Record<string, string>> => {
  const res = await fetch(`/api/variables?uid=${uid}`);
  if (!res.ok) throw new Error(`Failed to load variables: ${res.status}`);
  return await res.json();
};

export const saveVariables = async (
  uid: string,
  newVars: Record<string, string>
): Promise<void> => {
  const res = await fetch(`/api/variables?uid=${uid}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newVars),
  });

  if (!res.ok) throw new Error(`Failed to save variables: ${res.status}`);
};
