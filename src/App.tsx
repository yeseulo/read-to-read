import React, { useEffect, useState } from 'react';
import Router from 'components/Router';
import { authService } from 'firebaseSetting';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>{init ? <Router isLoggedIn={isLoggedIn} user={user} /> : 'Initailizing...'}</>
  );
}

export default App;
