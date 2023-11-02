import React, { useState, useEffect } from 'react';

function User() {
  const [userData, setUserData] = useState(null);

  // Use an effect to fetch user data when the component mounts
  useEffect(() => {
    // You need to make an authenticated request to your backend
    // to fetch user data after a successful login.
    // Replace this with your actual API endpoint.
    fetch('/userprofile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${yourAuthToken}` // Replace with your authentication token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.name}!</h1>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          {/* Add more user information here */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default User;
