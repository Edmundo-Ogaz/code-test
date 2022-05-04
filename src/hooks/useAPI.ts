import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { Task, Transaction } from '../types';

const useAPI = () => {
  const getTasks = useCallback(async (): Promise<Task[]> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return [];
      }

      return await response.json();
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
    }

    return [];
  }, []);

  const login = useCallback(
    async (param: { [email: string]: string; password: string }): Promise<any> => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/authenticate`, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          body: JSON.stringify(param)
        });

        if (response.status !== 200) {
          toast(`API request failed`, { type: 'error' });

          return [];
        }
        return await response.json();
      } catch (e) {
        console.log(e);

        toast(`API request failed`, { type: 'error' });
      }

      return [];
    },
    []
  );

  const getTransactions = useCallback(async (): Promise<{ [key: string]: Transaction }> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return {} as { [key: string]: Transaction };
      }
      return await response.json();
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
    }

    return {} as { [key: string]: Transaction };
  }, []);

  const remove = useCallback(async (id: string): Promise<any> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/delete/${id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return null;
      }
      return await response.json();
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
    }

    return null;
  }, []);

  return {
    getTasks,
    login,
    getTransactions,
    remove
  };
};

export default useAPI;
