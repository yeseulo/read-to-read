import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Auth from 'pages/Auth';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Navigation from 'components/Navigation';

const Router = ({ isLoggedIn, user }: any) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home user={user} />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
          </>
        ) : (
          <Route exact path='/'>
            <Auth />
          </Route>
        )}
      </Switch>
    </HashRouter>
  );
};

export default Router;
