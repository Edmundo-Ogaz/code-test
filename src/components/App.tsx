import 'react-app-polyfill/ie11';
import React, { FC, useState } from 'react';
import '@fortawesome/fontawesome-free/js/all';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import './App.scss';
import Welcome from './Welcome';
import Login from './Login';
import Transaction from './Transaction';
import { getSession } from '../sessionStorage';

const App: FC = () => {
  const [logged] = useState(() => getSession());
  return (
    <div className="App">
      {!logged ? (
        <Login></Login>
      ) : (
        <>
          <nav>
            <NavLink to="/">Welcome</NavLink>
            <NavLink to="/transaction?page=0">Transaction</NavLink>
          </nav>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route exact path="/transaction">
              <Transaction />
            </Route>
            <Redirect to="/" />
          </Switch>
          <ToastContainer style={{ fontSize: '16px' }} theme="dark" position="bottom-right" />
        </>
      )}
    </div>
  );
};

export default App;
