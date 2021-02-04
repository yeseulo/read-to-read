import React, { useState, useEffect } from 'react';
import { dbService } from 'firebaseSetting';
import Sentence from 'components/Sentence';

interface SentenceInfo {
  id: string;
  createdAt: number;
  creatorId: string;
  text: string;
}

const Home = ({ user }:any ) => {
  const [sentence, setSentence] = useState<string>('');
  const [sentences, setSentences] = useState<SentenceInfo[]>([]);

  useEffect(() => {
    dbService.collection('sentences').onSnapshot((snapshot) => {
      const list = snapshot.docs.map((item) => ({
        id: item.id,
        createdAt: item.data().createdAt,
        creatorId: item.data().creatorId,
        text: item.data().text,
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
        <div>
          {sentences.map((item) => (
            <Sentence key={item.id} sentence={item} isOwner={item.creatorId === user.uid} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;