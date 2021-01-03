import { authService } from 'firebaseSetting';
import React, { useState } from 'react';

const Auth = () => {
  const [isNewUser, setNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isNewUser) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onToggle = () => setNewUser((prevState) => !prevState);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type='email'
          placeholder='Email'
          value={email}
          required
          onChange={onChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          required
          onChange={onChange}
        />
        <button type='submit'>{isNewUser ? `Sign up` : `Sign in`}</button>
        {error && <p>{error}</p>}
      </form>
      <span onClick={onToggle}>{isNewUser ? `Sign in` : `Sign up`}</span>
      <div>
        <button type='button'>Continue with Google</button>
        <button type='button'>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
