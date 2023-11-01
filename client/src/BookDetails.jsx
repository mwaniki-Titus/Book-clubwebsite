import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [summary, setSummary] = useState('');
  const { bookId } = useParams(); // Extracting bookId from the URL params

  useEffect(() => {
    // Simulated book details
    const dummyBook = {
      bookID: bookId,
      bookTitle: 'Sample Book Title',
      author: 'Sample Author',
      imageURL: 'book-cover.jpg',
      clubID: 'Sample Club ID',
      // Add more book details...
    };

    // Simulating the delay of a network request
    const fetchData = async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(dummyBook), 1000); // Simulating a delay of 1 second
      });
    };

    fetchData().then((data) => {
      setBook(data);
    });
  }, [bookId]);

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleAddSummary = (e) => {
    e.preventDefault();
    // Logic to send the summary to the backend can be added here
    console.log('Added Summary:', summary);
    setSummary(''); // Clear the input field after adding the summary
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/">Back to Clubs</Link>
      <h2>{book.bookTitle}</h2>
      <p>Author: {book.author}</p>
      <img src={book.imageURL} alt={book.bookTitle} />
      <p>Book ID: {book.bookID}</p>
      <p>Club ID: {book.clubID}</p>
      {/* Display other book details here */}

      <form onSubmit={handleAddSummary}>
        <label htmlFor="summary">Add Summary:</label>
        <textarea
          id="summary"
          value={summary}
          onChange={handleSummaryChange}
          placeholder="Write a summary..."
        />
        <button type="submit">Add Summary</button>
      </form>
      {/* Display book summaries here */}
    </div>
  );
};

export default BookDetails;
