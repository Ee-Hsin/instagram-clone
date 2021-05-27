import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import AuthenticationModal from './AuthenticationModal';
import { db, auth } from './firebase';
import { Button } from '@material-ui/core';

function App() {

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    //State is not persistent but the auth user is stored in cookies so it will persist, and then this useEffect runs
    //on refresh and checks if the user is logged in or not.
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //User has logged in...
        console.log(authUser);
        setUser(authUser);
      } else {
        //user has logged out...
        setUser(null);
      }
    })

    return () => {
      //perform some cleanup functions before re-firing useEffect.
      unsubscribe();
    }
  }, [user, username])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => (
        {
          id: doc.id,
          post: doc.data()
        }
      )))
    })
  }, [])

  //To Sign Up
  const signUp = (event) => {
    event.preventDefault(); //Prevents page from refreshing (default behaviour of submit buttons for forms)

    //We send the email and password to the backend, using the variables we stored in state (unlike MEN stack where
    //we used the form to directly send the info, here we use a sign up handler to send the info and we use
    //the state variables (which we should have stored as the user typed))
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => { //After user is created, we want to also update their profile with a username.
      return authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error)=> alert(error.message));

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="app">
      <AuthenticationModal 
        open={open} setOpen={setOpen}
        username={username} setUsername={setUsername} 
        email={email} setEmail={setEmail} 
        password={password} setPassword={setPassword}
        openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} 
        signIn={signIn} signUp={signUp}
      />

      <div className="app_header">
        <img
          className="app_headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
          alt=""
        />
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Login</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}

      {posts.map(({id, post})=> (
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
      ))}

    </div>
  );
}

export default App;