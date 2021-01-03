import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Auth from 'pages/Auth';
import Home from 'pages/Home';

const Router = ({ isLoggedIn }: any) => {
  return (
    <HashRouter>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route>
              <Home />
            </Route>
          </>
        ) : (
          <Route>
            <Auth />
          </Route>
        )}
      </Switch>
    </HashRouter>
  );
};

export default Router;
