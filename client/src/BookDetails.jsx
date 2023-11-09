import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import './BookDetails.css'

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bookid } = useParams();
  const userid = localStorage.getItem('userID')
  const [personsummary, setpersonSummary] = useState({
        summary:"",
        bookID:"",
        userID:""
  }); 
  


  const {summary,bookID,userID}= personsummary
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        setpersonSummary({...personsummary,userID:userid})
        if (bookid) {
          const response = await axios.get(
            `https://bookclubbackend.onrender.com/book/${bookid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          setBook(response.data);
          setLoading(false);
          
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [bookid]);


  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log(personsummary)
      setpersonSummary({ ...personsummary, bookID: bookid });
      const response = await axios.post(
        'https://bookclubbackend.onrender.com/summaries',personsummary,);

      if (response.status === 201) {
    
        alert('Summary added successfully');
        location.reload();
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
    } catch (error) {
      alert('Unable to add summary');
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <>
    <Navbar/>
    <div className='parentDiv'>
    <div className="bookDetails">
   <div className='firstDiv'>
    {book.map((item) =>(
      <div  className="bookDiv" key={item.bookID}>
        <div className='book1'>
        <div className='title'>
        <h1>{item.bookTitle}</h1>
        </div>
        <img src="https://images.pexels.com/photos/2736542/pexels-photo-2736542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
        <h2>Book Lovers Group</h2>
        <div className='underline1'></div>
        <div className='nav'>
        <p>{item.bookauthor} </p>
        <p>Summary</p>
        <p>Files</p>
        <p>Members</p>
        <p>About</p>
        </div>
        <div className='underline2'></div>
       </div>
       <div className='summaryDiv'>
        <div className='summaryDiv1'>
        <form className="secondDiv" onSubmit={handleSubmit}>
          <h2>Add a summary to the club of the book</h2>
           <label>
           <textarea value={summary} onChange={(e) => setpersonSummary({ ...personsummary, summary: e.target.value })} />
           </label>
           <button type="submit">Add Summary</button>
         </form>
        {item.reviews.map((review,index)=>(
           <div className="reviewDiv"key={review[index].summaryID}>
            <h3><Link to={`/profile/${review[index].userID}`}>{review[index].user}</Link></h3>
            <p>{review[index].summary}</p>
            <div className='socials'>
              <h3>like</h3>
              <h3>follow</h3>
              <h3>comment</h3>
            </div>
          </div>
        ))}
        </div>
        <div className='summaryDiv2'>
          <h5>{item.bookSynopsis}</h5>
          <h5>Welcome to the group! A space for us to connect and share with each other.Start by posting your thoughts.</h5>
          </div>
        </div>
      </div>
    ))}
    </div>
    <div>
      </div>
      </div>
      </div>
    </>
  );
};

export default BookDetails;
