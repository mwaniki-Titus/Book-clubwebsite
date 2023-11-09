import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from 'axios';

const Profile = ({onLoginOut}) => {
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
    <>
      <Navbar />
      <h1>Personal Profile</h1>
      {loading && <p>Loading user data...</p>}
      {error && <p>Error: {error.message}</p>}
      {userData.name && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <h3>Clubs:</h3>
          <ul>
            {userData.clubs.map((club) => (
              <li key={club.clubID}>{club.clubName}</li>
            ))}
          </ul>
          <h3>Followers:</h3>
          <ul>
            {userData.follower.map((follower) => (
              <li key={follower.user_id}>User ID: {follower.user_id}</li>
            ))}
          </ul>
          <h3>Summaries:</h3>
          <ul>
            {userData.summaries.map((summary,index) => (
              <li key={summary[index].summaryID}>
                Summary: {summary[index].summary}
              </li>
            ))}
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </div>
        
      )}
    </>
  );
};

export default Profile;
