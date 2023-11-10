import React from 'react';
import "./App.css"
import { Route, Routes, Navigate } from 'react-router-dom';
import ClubDisplay from "./ClubDisplay"
import Others from "./Others"
import LogIn from './LogIn';
import About from './About';
import CreateClub from './CreateClub';
import ClubSection from './ClubSection';
import { useState, useEffect } from 'react';
import Profile from './Profile';
import SignUp from './SignUp';
import BookDetails from './BookDetails';
import Navbar from './Navbar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated by reading from localStorage
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    const joinedStatus = localStorage.getItem("joined");

    if (storedAuthStatus === 'true') {
      setIsAuthenticated(true);
    }

    if (joinedStatus === 'true') {
      setJoined(true);
    }
  }, []);

  const changeJoin = () => {
    setJoined(true);
    localStorage.setItem('joined', 'true');
  };

  const changeJoinOut = () => {
    setJoined(false);
    localStorage.removeItem('joined');
  };

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
      <Routes>
        <Route
          path="/home"
          element={
            isAuthenticated ? <ClubDisplay /> : <Navigate to="/login" />
          }
          index={true}
        />
        <Route
          path="/create-club"
          element={
            isAuthenticated ? <CreateClub /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile onLoginOut={handleLogout} changeJoinOut={changeJoinOut} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <LogIn onLogin={handleLogin} />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/clubs/:clubId"
          element={<ClubSection changeJoin={changeJoin} />}
        />
        <Route
          path="/book/:bookid"
          element={joined ? <BookDetails /> : <Navigate to="/home" />}
        />
        <Route path="/profile/:userId" element={<Others />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
};

export default App;
