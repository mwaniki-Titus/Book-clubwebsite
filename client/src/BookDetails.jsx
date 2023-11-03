import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bookid } = useParams();
  const [summary, setSummary] = useState(''); // Summary should be a string
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchData = async () => {
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
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://bookclubbackend.onrender.com/summaries',
        {
          summary: summary,
          bookID: bookid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        setSummary("")
        console.log('Summary added successfully');
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
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} />
        </label>
        <button type="submit">Add Summary</button>
      </form>
    </>
  );
};

export default BookDetails;
