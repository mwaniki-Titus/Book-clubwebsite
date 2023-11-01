import React from 'react';
import { useState } from 'react';

function Home() {
  const {bookClubs,setbookClub} = useState([]);
  return (
    <div>
      <h2>Available Book Clubs</h2>
      <ul>
        {/* {bookClubs.map((club) => (
          <li key={club.id}>{club.name}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default Home;