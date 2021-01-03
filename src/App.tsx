import React, { useState } from 'react';
import Router from 'components/Router';
import { authService } from 'firebaseSetting';

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(authService.currentUser);
  return <Router isLoggedIn={isLoggedIn} />;
}

export default App;
