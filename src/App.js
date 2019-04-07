import React, { useState, useEffect } from 'react';
import { firebase } from './firebase';

import Nav from './Nav';
import Channel from './Channel';

function App() {
  const user = useAuth();

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Channel />
    </div>
  ) : (
    <Login />
  );
}

function Login() {
  const [authError, setAuthError] = useState(null);

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
    }
  };

  return (
    <div className="Login">
      <h1>Firebase Chat App 🔥</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {authError && (
        <div>
          <p>Sorry, there was an error.</p>
          <p>{authError.message}</p>
          <p>Please, try again.</p>
        </div>
      )}
    </div>
  );
}

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setUser({
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid
          });
        } else {
          setUser(null);
        }
      }),
    []
  );

  return user;
}

export default App;
