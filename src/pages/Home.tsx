import React, { useState, useEffect } from 'react';
import { dbService, storageService } from 'firebaseSetting';
import Sentence from 'components/Sentence';
import { v4 as uuidv4 } from 'uuid';

interface SentenceInfo {
  id: string;
  createdAt: number;
  creatorId: string;
  text: string;
}

const Home = ({ user }:any ) => {
  const [sentence, setSentence] = useState<string>('');
  const [sentences, setSentences] = useState<SentenceInfo[]>([]);
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    dbService.collection('sentences').onSnapshot((snapshot) => {
      const list = snapshot.docs.map((item) => ({
        id: item.id,
        createdAt: item.data().createdAt,
        creatorId: item.data().creatorId,
        text: item.data().text,
        imageUrl: item.data().imageUrl,
      }));
      setSentences(list);
    });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imageUrl = '';

    if ( image !== '') {
      const imageRef = storageService.ref().child(`${user.uid}/${uuidv4()}`);
      const response = await imageRef.putString(image, 'data_url');
      imageUrl = await response.ref.getDownloadURL();
    }

    const setenceObj = {
      text: sentence,
      createdAt: Date.now(),
      creatorId: user.uid,
      imageUrl,
    };
    await dbService.collection('sentences').add(setenceObj);
    setSentence('');
    setImage('');
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSentence(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const result = (finishedEvent.target?.result)!;
      if ( typeof result === 'string') {
        setImage(result);
      } else {
        setImage(result.toString());
      }
    };
    reader.readAsDataURL(file);
  }

  const onClearFile = () => {
    setImage('');
  }

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
        <input type='file' accept='image/*' onChange={onFileChange} />
        <button type='submit'>Save</button>
        {image && (
          <div>
            <img src={image} width='50px' height='auto' alt='Uploaded' />
            <button type="button" onClick={onClearFile}>Clear</button>
          </div>
        )}
      </form>
      {sentences.length > 0 && (
        <div>
          {sentences.map((item) => (
            <Sentence
              key={item.id}
              sentence={item}
              isOwner={item.creatorId === user.uid}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;