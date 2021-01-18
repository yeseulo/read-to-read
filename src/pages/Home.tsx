import React, { useState } from 'react';
import { dbService } from 'firebaseSetting';

const Home = () => {
  const [sentence, setSentence] = useState('');
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dbService.collection('sentences').add({
      sentence,
      createdAt: Date.now(),
    });
    setSentence('');
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSentence(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder="What's your sentence?"
          maxLength={250}
          value={sentence}
          onChange={onChange}
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default Home;