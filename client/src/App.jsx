import React from 'react';
import { BrowserRouter as  Routes, Route } from 'react-router-dom';
import ClubDisplay from './ClubDispay';
import BookList from './BookList';
import BookDetails from './BookDetails';
import Navbar from './Navbar';
import Home from './Home'; // Create Home component
import CreateClub from './CreateClubs'; // Create CreateClub component
import MyAccount from './MyAccount'; // Create MyAccount component
import LogIn from './LogIn'; // Create SignIn component
import SignUp from './SignUp'; // Create SignUp component

function App() {
  return (
    
      <Routes>
        <Navbar/>
        <Route path="/" element={<ClubDisplay />} />
        <Route path="/books/:clubId" element={<BookList />} />
        <Route path="/book/:bookId" element={<BookDetails />} />

          <Route exact='true' path="/" element={<Home/>} />
          <Route path="/create-club" element={<CreateClub/>} />
          <Route path="/my-account" element={<MyAccount/>} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="/signup" element={<SignUp/>} />
        
      </Routes>
    
  );
}

export default App;
