import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';



const ClubDisplay = () => {

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    setName(storedName);
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return; // Prevent further API requests if not authenticated
      }
      try {
        const response = await axios.get('https://bookclubbackend.onrender.com/clubs', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchData(); // Call the async function
  }, []);

  return (
    <div className='Home'>
      <Navbar/>
      <div className='firstDiv'>
        <div>
      <h1 className='welcome'>Welcome Back!</h1>
      <div className='div'></div>
      </div>
      <div>
      <h1 className='username'>{name}</h1>
      <div className='div'></div>
      </div>
      </div>
      <div className='secondDiv'>
      <input type="text" placeholder="Search club" className='searchComponent'/>
      <p className='description'>Welcome to our book club community, where every page holds a new adventure. Join us in exploring the literary world, sharing stories, and forging friendships. Together, we'll uncover the magic of books. Begin your literary journey here!</p>
      </div>
      <div className="clubs-container">
      {data.map(club => (
          <div className='club' key={club.clubID}>
            <div className="club-info">
            <Link to={`/clubs/${club.clubID}`}>
          <h2>{club.clubName}</h2>
          </Link>
          <p> {club.description}</p>
          <img src={club.imageLink} alt={club.clubName} />
          <p>Location: {club.location}</p>
          <p>Date Founded: {club.dateFounded}</p>
         </div>
          </div>
      ))}
      </div>
    </div>
  );
};

export default ClubDisplay;
