export const setSession = (session: boolean): void => {
  localStorage.setItem('session', JSON.stringify(session));
};

export const getSession = (): object | null => {
  const sessionStr: string | null = localStorage.getItem('session');
  if (sessionStr) return JSON.parse(sessionStr);
  return null;
};
