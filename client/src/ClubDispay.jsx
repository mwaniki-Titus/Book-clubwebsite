import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const ClubDisplay = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    // Simulating fetching data from an API (replace this once you have the actual backend)
    const dummyData = [
      {
        clubID: 1,
        clubName: 'Book Club One',
        description: 'A club for book lovers!',
        imageLink: 'image-link-one.jpg',
        location: 'New York',
        dateFounded: '2023-10-01',
      },
      // Add more dummy data here...
    ];
    setClubs(dummyData);
  }, []);

  return (
    <div>
      <Navbar/>
      <h1>Welcome to the Book Clubs!</h1>
      <input type="text" placeholder="Search club" />
       <p>Welcome to our book club community, where every page holds a new adventure. Join us in exploring the literary world, sharing stories, and forging friendships. Together, we'll uncover the magic of books. Begin your literary journey here!</p>
      {clubs.map(club => (
        <div key={club.clubID}>
          <h2>{club.clubName}</h2>
          <p>Description: {club.description}</p>
          <img src={club.imageLink} alt={club.clubName} />
          <p>Location: {club.location}</p>
          <p>Date Founded: {club.dateFounded}</p>
          <Link to={`/books/${club.clubID}`}>View Books</Link>
        </div>
      ))}
    </div>
  );
};

export default ClubDisplay;
