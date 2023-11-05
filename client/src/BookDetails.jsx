import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
      setpersonSummary({ ...personsummary, bookID: bookid });
      const token = localStorage.getItem('token');
      try {
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
      setpersonSummary({...personsummary,bookID:bookid})
      const token = localStorage.getItem('token');
      setpersonSummary({...personsummary,userID:userid})
      console.log(personsummary)
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
    {book.map((item) =>(
      <div key={item.bookID}>
        <h1>{item.bookTitle}</h1>
        <p>{item.bookauthor} </p>
        <img src={item.bookImageURL} alt={item.bookTitle} />
        <h1>SUMMARY:</h1>
        {item.reviews.map((review,index)=>(
           <div key={review.summaryID}>
            <p>{review[index].summary}</p>
           </div>
        ))}
      </div>
    ))}
      <form onSubmit={handleSubmit}>
        <label>
          Summary:
          <textarea value={summary} onChange={(e) => setpersonSummary({ ...personsummary, summary: e.target.value })} />
        </label>
        <button type="submit">Add Summary</button>
      </form>
    </>
  );
};

export default BookDetails;
