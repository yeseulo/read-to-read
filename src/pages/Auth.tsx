import { authService, firebaseInstance } from 'firebaseSetting';
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

  const onSocialLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { name } = e.target as HTMLInputElement;
    let provider: any;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

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
        <button name='google' onClick={onSocialLogin}>
          Continue with Google
        </button>
        <button name='github' onClick={onSocialLogin}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
