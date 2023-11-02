import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import CreateClub from './CreateClubs';
import MyAccount from './MyAccount';
import LogIn from './LogIn';
import SignUp from './SignUp';
import JoinBookClub from './JoinBookClub';
import User from './User';
import { API_BASE_URL } from './config';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Simulate a successful login
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Simulate a logout
    setIsAuthenticated(false);
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route
          exact
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
          path="/home"
          element={
            isAuthenticated ? (
              <Home />
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
              <LogIn onLogin={handleLogin} />
            )
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user" element={<User isAuthenticated={isAuthenticated} />} />
      </Routes>
    </>
  );
};

export default App;
