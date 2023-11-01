import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  function handleLogout() {
    // Implement the logout functionality here
    // For example, send a request to your server to log the user out
  }

  return (
    <div className="nav">
      <div className="home">
        <Link to="/" className="homebutton">
          Home
        </Link>
      </div>
      
      <Link to="/clubs" className="link">
        Clubs
      </Link>
      
      <Link to="/create-club" className="link">
        Create Club
      </Link>

      {user ? (
        // Display "My Account" and "Logout" when the user is authenticated
        <>
          <Link to="/my-account" className="link">
            My Account
          </Link>

          <button className="link" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        // Display "Sign In" and "Sign Up" when the user is not authenticated
        <>
          <Link to="/sign-in" className="link">
            Sign In
          </Link>

          <Link to="/sign-up" className="link">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;