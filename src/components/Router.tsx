import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Auth from 'pages/Auth';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Navigation from 'components/Navigation';

const Router = ({ isLoggedIn, user, refreshUser }: any) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation userName={user.displayName} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home user={user} />
            </Route>
            <Route exact path='/profile'>
              <Profile user={user} refreshUser={refreshUser} />
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
