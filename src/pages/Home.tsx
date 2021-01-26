import React, { useState, useEffect } from 'react';
import { dbService } from 'firebaseSetting';
interface ISentence {
  id: string;
  createdAt: number;
  sentence: string;
}

const Home = ({ user }:any ) => {
  const [sentence, setSentence] = useState('');
  const [sentences, setSentences] = useState<any[]>([]);

  useEffect(() => {
    dbService.collection('sentences').onSnapshot((snapshot) => {
      const list = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setSentences(list);
    });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dbService.collection('sentences').add({
      text: sentence,
      createdAt: Date.now(),
      creatorId: user.uid,
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
      {sentences.length > 0 && (
        <ul>
          {sentences.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;