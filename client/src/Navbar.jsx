import React from "react";
import { Link } from "react-router-dom";

const Navbar=() =>{

  return (
    <>
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link> 
        </li>
        <li>
          <Link to="/create-club">New Club</Link> 
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  </> 
  );
}

export default Navbar;
