import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import './Profile.css'
import { Link } from "react-router-dom";

const Profile = ({onLoginOut,changeJoinOut}) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get("https://bookclubbackend.onrender.com/userlogout", { headers })
      .then((response) => {
       
        console.log("Logged out successfully");

        localStorage.removeItem("token");
        localStorage.removeItem("name")
        localStorage.removeItem("userID")
        onLoginOut()
        changeJoinOut()
        swal({
            title: 'Success',
            text: 'Logged out successfully',
            icon: 'success',
          });
      })
      .catch((error) => {
       
        console.error("Error logging out:", error);
      });
  };


  useEffect(() => {
    const apiUrl = `https://bookclubbackend.onrender.com/userprofile`;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(apiUrl, config)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="parentprofile">
     <Navbar />
    <div className="Profile">
      <div className="profileDiv1">
      <h1>Personal Profile</h1>
      <p>welcome to the profile page</p>
      <button><Link to="https://bookclubbackend.onrender.com/admin/">Admin</Link></button>
      </div>
      <div className="profileDiv2">
      {loading && <p>Loading user data...</p>}
      {error && <p>Error: {error.message}</p>}
      {userData.name && (
        <div>
          <p className="name">{userData.name}</p>
          <p className="email">{userData.email}</p>
          <div className="profileparentContainer">
          <h3>Clubs:</h3>
          <div className="profileContainer">
          <ul>
            {userData.clubs.map((club) => (
              <li key={club.clubID}>{club.clubName}</li>
            ))}
          </ul>
          </div>
          </div>
          <div className="profileparentContainer">
          <h3>Followers:</h3>
          <div className="profileContainer">
          <ul>
            {userData.follower.map((follower) => (
              <li key={follower.user_id}>{follower.name}</li>
            ))}
          </ul>
          </div>
          </div>
          <div className="profileparentContainer">
          <h3>Summaries:</h3>
          <div className="profileContainer">
          <ul>
            {userData.summaries.map((summary,index) => (
              <li key={summary[index].summaryID}>
                {summary[index].summary}
              </li>
            ))}
          </ul>
          </div>
          </div>
          <div className="button">
          <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        
      )}
      </div>.
      </div>
    </div>
  );
};

export default Profile;
