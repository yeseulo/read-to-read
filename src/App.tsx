import React, { useEffect, useState } from 'react';
import Router from 'components/Router';
import { authService } from 'firebaseSetting';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return <>{init ? <Router isLoggedIn={isLoggedIn} /> : 'Initailizing...'}</>;
}

export default App;
