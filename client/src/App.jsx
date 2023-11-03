import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClubDisplay from "./ClubDisplay"
import { useState,useEffect } from 'react';
import About from './About';
import Navbar from './Navbar';
import CreateClub from './CreateClub';
import Profile from './Profile';
import LogIn from './LogIn'; // Create SignIn component
import SignUp from './SignUp'; // Create SignUp component


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated by reading from localStorage
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    if (storedAuthStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    // Simulate a successful login
    setIsAuthenticated(true);
    // Store the authentication status in localStorage
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    // Simulate a logout
    setIsAuthenticated(false);
    // Clear the authentication status from localStorage
    localStorage.removeItem('isAuthenticated');
  };

  

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={isAuthenticated ? <ClubDisplay /> : <Navigate to="/login" />}/>
        <Route path="/create-club" element={isAuthenticated ? ( <CreateClub />) : (<Navigate to="/login" />)}/>
        <Route path="/profile" element={isAuthenticated ? (<Profile />) : (<Navigate to="/login" />)}/>
        <Route path="/about" element={<About />}/>
        <Route path="/login" element={isAuthenticated ? (<Navigate to="/" />) : (<LogIn onLogin={handleLogin} />)}/>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
