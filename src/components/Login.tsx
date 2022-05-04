import React, { FC, FormEvent, ChangeEvent, useState } from 'react';
import { setSession } from '../localStorage';
import useApi from '../hooks/useAPI';

import './Login.scss';

const Login: FC = () => {
  const { login } = useApi();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password }).then(() => {
      setSession(true);
      window.location.href = '/';
    });
  };

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <main className="Login">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Log In</legend>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" onChange={handleUsername} required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={handlePassword} required />
          <button>Login</button>
        </fieldset>
      </form>
    </main>
  );
};

export default Login;
