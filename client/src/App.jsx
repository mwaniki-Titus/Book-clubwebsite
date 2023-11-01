import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import CreateClub from './CreateClubs';
import MyAccount from './MyAccount';
import LogIn from './LogIn';
import SignUp from './SignUp';
import JoinBookClub from './JoinBookClub';

import './App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create-club" element={<CreateClub />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/sign-in" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/join-book-club" element={<JoinBookClub />} />
      </Routes>
    </>
  );
};

export default App;
