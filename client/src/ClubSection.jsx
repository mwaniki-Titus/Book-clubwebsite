// ClubSection.js
import React, { useState, useEffect } from 'react';
import { Form, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './ClubSection.css'; 
import Review from "./Review"
import CreateBookForm from './CreateBookForm';

const ClubSection = ({changeJoin}) => {
  const [club, setClub] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clubId } = useParams();

    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        if (clubId) {
          const response = await axios.get(`https://bookclubbackend.onrender.com/clubs/${clubId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          setClub([response.data]);
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
  }, [clubId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const handleClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://bookclubbackend.onrender.com/joinclub',
        { clubID: clubId }, // Data to send in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 201) {
        // Use 201 status code to indicate successful resource creation
        changeJoin()
        
        swal({
          title: 'Success',
          text: 'Joined the club successfully',
          icon: 'success',
        });
        
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      alert('Unable to join the club');
      console.error(error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div>
      {Array.isArray(club)
        ? club.map((item) => (
            <div key={item.clubID} className="club-section-container">
              <div className='elementOne'>
                <div className='head'>
                  <div>
               <img src={item.imageLink}/>
               </div>
               <div>
              <h2>{item.clubName}</h2>
              <p >{item.location}</p>
              <p>{item.description}</p>
              </div>
              </div>
              </div>
              <div className='elementTwo'>
              <div className='elementTwo2'>
                 <Review/>
               </div>
                <div className='elementTwo1'>
              {item.booksData.map((book, index) => (
                 <div>
                <div className='associated-booksDiv'>
                <div key={book[index].bookID} className="book-details">
                  <div className='section'>
                  <img src={book[index].bookImageURL} alt={book[index].bookTitle} className="book-image"/>
                  <div>
                    <h1 className="book-title">{book[index].bookTitle}</h1>
                    <h4 className="book-author">{book[index].bookAuthor}</h4>
                    <button className="open-button">
                      <Link to={`/book/${book[index].bookID}`}>Open</Link>
                    </button>
                  </div>
                </div>
                </div>
                </div>
                </div>
              ))}
              </div>
              <div className='join-div'>
              <CreateBookForm fetchData={fetchData}/>
                <h1>Join The Club</h1>
                <p>Joining a book club is not just about reading books; it's about expanding your horizons, making new friends, and discovering the magic that happens when people come together to explore the world one page at a time.</p>
                <button  onClick={handleClick} className='open-button '>Join Now</button>
               </div>
              </div>
            </div>
          ))
        : null}
       </div>
    </>
  );
};

export default ClubSection;