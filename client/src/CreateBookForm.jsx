import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CreateBookForm = ({fetchData}) => {
  const { clubId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    imageURL: '',
    synopsis: '',
    chapters: '',
    clubID: clubId,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post('https://bookclubbackend.onrender.com/createbook', formData,
      {headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',}},);
      if (response.status === 200) {
        fetchData()
        alert('Book created successfully');
        setFormData({
          title: '',
          author: '',
          imageURL: '',
          synopsis: '',
          chapters: '',
          clubID: clubId,
        })
        // Optionally, you can redirect or perform other actions after successful book creation
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create the book.');
    }
  };

  return (
    <div className='parentform-container'>
    <div className="form-container">
      <h2>Create New Book</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <label htmlFor="imageURL">Image URL:</label>
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          required
        />

        <label htmlFor="synopsis">Book Summary:</label>
        <textarea
          id="synopsis"
          name="synopsis"
          rows="4"
          value={formData.synopsis}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="chapters">Number of Chapters:</label>
        <input
          type="number"
          id="chapters"
          name="chapters"
          value={formData.chapters}
          onChange={handleChange}
          required
        />

        <label htmlFor="clubID">Club ID:</label>
        <input
          type="number"
          id="clubID"
          name="clubID"
          value={formData.clubID}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Book</button>
      </form>
    </div>
    </div>
  );
};

export default CreateBookForm;
