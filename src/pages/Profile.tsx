import { authService } from 'firebaseSetting';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const onSignOut = () => {
    authService.signOut();
    history.push('/');
  };

  return (
    <div>
      profile
      <button onClick={onSignOut}>Sign out</button>
    </div>
  );
};

export default Profile;
