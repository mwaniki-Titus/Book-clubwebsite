import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import CreateClub from './CreateClubs';
import MyAccount from './MyAccount';
import LogIn from './LogIn';
import SignUp from './SignUp';
import JoinBookClub from './JoinBookClub';
import './App.css';

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
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-club"
          element={
            isAuthenticated ? (
              <CreateClub />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/my-account"
          element={
            isAuthenticated ? (
              <MyAccount />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/join-book-club"
          element={
            isAuthenticated ? (
              <JoinBookClub />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <LogIn onLogin={handleLogin} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
