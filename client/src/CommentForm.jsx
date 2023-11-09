import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CommentForm = () => {
  // Initialize state for form inputs
  const [formData, setFormData] = useState({
    comment: '',
    rating: '',
    clubID: '',
    userID: '',
  });
  const { clubId } = useParams();

  const navigate = useNavigate();

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    setFormData({ ...formData, userID: userId });
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const { comment, rating, clubID, userID } = formData;

    if (!clubId) {
      console.log("Error: clubId is missing.");
      return;
    }
       
    try {
        setFormData({ ...formData, clubID: clubId });
        console.log(formData)
      const response = await axios.post(
        `https://bookclubbackend.onrender.com/book/rating`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Submitted Data:', { comment, rating, clubID, userID });
      // Clear the form fields
      setFormData({ comment: '', rating: '' });
    } catch (error) {
      console.log("Oops, something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
