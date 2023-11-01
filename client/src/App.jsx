import React from 'react';
import { BrowserRouter as  Routes, Route } from 'react-router-dom';
import ClubDisplay from './ClubDispay';
import BookList from './BookList';
import BookDetails from './BookDetails';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<ClubDisplay />} />
        <Route path="/books/:clubId" element={<BookList />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
      </Routes>
    
  );
}

export default App;
