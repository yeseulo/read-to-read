import React, { useState } from 'react';
import { dbService } from 'firebaseSetting';

const Sentence = ({ sentence, isOwner }) => {
  const [edit, setEdit] = useState(false);
  const [newSentence, setNewSentence] = useState(sentence.text);

  const toggleEdit = () => setEdit((prev) => !prev);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSentence(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dbService.doc(`sentences/${sentence.id}`).update({
      text: newSentence
    });
    setEdit(false);
  };

  const onDelete = async (id) => {
    const ok = window.confirm('Are you sure you want to delete this sentence?');
    if (ok) {
      await dbService.doc(`sentences/${id}`).delete();
    }
  };

  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              value={newSentence}
              required
              onChange={onChange}
            />
            <button type='submit'>Update</button>
          </form>
          <button onClick={toggleEdit}>Cancel</button>
        </>
      ) : (
        <>
          {sentence.text}
          {isOwner && (
            <>
              <button onClick={toggleEdit}>Edit</button>
              <button onClick={() => onDelete(sentence.id)}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sentence;
