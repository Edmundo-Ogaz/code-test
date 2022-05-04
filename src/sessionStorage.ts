export const setSession = (session: boolean): void => {
  sessionStorage.setItem('session', JSON.stringify(session));
};

export const getSession = (): object | null => {
  const sessionStr: string | null = sessionStorage.getItem('session');
  if (sessionStr) return JSON.parse(sessionStr);
  return null;
};
