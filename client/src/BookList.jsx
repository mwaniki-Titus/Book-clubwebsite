import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';


const BookList = () => {
  const [books, setBooks] = useState([]);
  const { clubId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://bookclubbackend.onrender.com/clubs/${clubId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [clubId]);



  const handleJoinClub = () => {
    // Logic to join the club can be added here, like making an API call or updating the state
    console.log('Joining the club');
  };

  
  const handleAddReview = (bookID, reviewText) => {
    const updatedBooks = books.map((book) => {
      if (book.bookID === bookID) {
        return {
          ...book,
          reviews: [...book.reviews, reviewText],
        };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  return (
    <div>
      <h1>Books Read in this Club</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        books.map((book) => (
          <div key={book.bookID}>
            {/* Book details rendering code */}
          </div>
        ))
      )}
      <div>
        <p>
          Joining a book club is not just about reading books; it's about expanding your horizons, making new friends, and discovering the world of literature.
        </p>
        <button onClick={handleJoinClub}>Join Club</button>
      </div>
    </div>
  );
};

const ReviewForm = ({ bookID, onAddReview }) => {
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReview(bookID, reviewText);
    setReviewText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
      <button type="submit">Add Review</button>
    </form>
  );
};




export default BookList;
