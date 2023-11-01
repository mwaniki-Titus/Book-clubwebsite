import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Simulating fetching book data from an API (replace this once you have the actual backend)
    const dummyData = [
      {
        bookID: 1,
        title: 'Book One',
        author: 'Author A',
        summary: 'A great book to read!',
        coverImage: 'book-cover-one.jpg',
        reviews: [] // Initially, the reviews array is empty for each book
      },
      // Add more dummy data here...
    ];
    setBooks(dummyData);
  }, []);

  const handleJoinClub = () => {
    // Logic to join the club can be added here, like making an API call or updating the state
    console.log('Joining the club');
  };

  const handleAddReview = (bookID, reviewText) => {
    const updatedBooks = books.map(book => {
      if (book.bookID === bookID) {
        return {
          ...book,
          reviews: [...book.reviews, reviewText]
        };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  return (
    <div>
      <h1>Books Read in this Club</h1>
      {books.map(book => (
        <div key={book.bookID}>
          <img src={book.coverImage} alt={book.title} />
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Summary: {book.summary}</p>
          <Link to={`/book/${book.bookID}`}>View Details</Link>
          <div>
            <p>
              {book.reviews && book.reviews.length > 0
                ? `Reviews (${book.reviews.length})`
                : 'No reviews yet'}
            </p>
            <ul>
              {book.reviews &&
                book.reviews.map((review, index) => (
                  <li key={index}>{review}</li>
                ))}
            </ul>
            <ReviewForm bookID={book.bookID} onAddReview={handleAddReview} />
          </div>
        </div>
      ))}
      <div>
        <p>
          Joining a book club is not just about reading books; it's about expanding your horizons, making new friends, and discovering the magic that happens when people come together to explore the world one page at a time.
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
