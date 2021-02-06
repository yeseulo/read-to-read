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
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          updateProfile: (args: any) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const currentUser = authService.currentUser;
    if ( currentUser ){
      setUser({
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        updateProfile: (args: any) => currentUser.updateProfile(args),
      });
    }
  }

  return (
    <>
      {init ? (
        <Router isLoggedIn={isLoggedIn} user={user} refreshUser={refreshUser} />
      ) : (
        'Initailizing...'
      )}
    </>
  );
}

export default App;
