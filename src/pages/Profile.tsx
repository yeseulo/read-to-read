import React, { useEffect, useCallback, useState } from 'react';
import { authService, dbService } from 'firebaseSetting';
import { useHistory } from 'react-router-dom';

const Profile = ({ user, refreshUser }: any) => {
  const history = useHistory();
  const [newName, setNewName] = useState(user.displayName);
  const onSignOut = () => {
    authService.signOut();
    history.push('/');
  };

  const getMySentences = useCallback(async () => {
    const sentences = await dbService
      .collection('sentences')
      .where('creatorId', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .get();
    console.log(sentences.docs.map((doc) => doc.data()));
  }, [user.uid]);

  useEffect(() => {
    getMySentences();
    return () => {};
  }, [getMySentences]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.displayName !== newName) {
      await user.updateProfile({
        displayName: newName,
      });
      refreshUser();
    }
  };

  return (
    <div>
      profile
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Display Name'
          value={newName}
          onChange={onChange}
        />
        <button type='submit'>Update</button>
      </form>
      <button onClick={onSignOut}>Sign out</button>
    </div>
  );
};

export default Profile;
