import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // Import your Navbar component
import Home from './Home'; // Create Home component
import CreateClub from './CreateClubs'; // Create CreateClub component
import MyAccount from './MyAccount'; // Create MyAccount component
import LogIn from './LogIn'; // Create SignIn component
import SignUp from './SignUp'; // Create SignUp component
import JoinBookClub from './JoinBookClub';

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

const App = () => {

  return(
    <>
    <Navbar />
      <Routes>
          <Route exact='true' path="/" element={<Home/>} />
          <Route path="/create-club" element={<CreateClub/>} />
          <Route path="/my-account" element={<MyAccount/>} />
          <Route path="/sign-in" element={<LogIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/join-book-club" element={<JoinBookClub/>} />
      </Routes>
      </>
  );
};
export default App;
