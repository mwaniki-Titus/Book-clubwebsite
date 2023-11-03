import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClubDisplay from "./ClubDisplay"
import BookList from './BookList';
import BookDetails from './BookDetails';
import Navbar from './Navbar';
import CreateClub from './CreateClub';
import Profile from './Profile';
import LogIn from './LogIn'; // Create SignIn component
import SignUp from './SignUp'; // Create SignUp component

const App=() =>{

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<ClubDisplay/>} />
        <Route path="/books/:clubId" element={<BookList />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/create-club" element={<CreateClub/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        
      </Routes>
    </>
  );
}

export default App;
