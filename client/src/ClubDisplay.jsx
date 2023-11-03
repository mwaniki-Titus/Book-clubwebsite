import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const ClubDisplay = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return; // Prevent further API requests if not authenticated
      }
      console.log(token);
    
      try {
        const response = await axios.get('https://bookclubbackend.onrender.com/clubs', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchData(); // Call the async function
  }, []);

  return (
    <div>
      <h1>Welcome to the Book Clubs!</h1>
      <input type="text" placeholder="Search club" />
      <p>Welcome to our book club community, where every page holds a new adventure. Join us in exploring the literary world, sharing stories, and forging friendships. Together, we'll uncover the magic of books. Begin your literary journey here!</p>
      {data.map(club => (
        <Link to={`/books/${club.clubID}`}>
          <div key={club.clubID}>
          <h2>{club.clubName}</h2>
          <p>Description: {club.description}</p>
          <img src={club.imageLink} alt={club.clubName} />
          <p>Location: {club.location}</p>
          <p>Date Founded: {club.dateFounded}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ClubDisplay;
