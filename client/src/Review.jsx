import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewsCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { clubId } = useParams();
  const user=localStorage.getItem("userID")
  const [formData, setFormData] = useState({
    comment: '',
    rating: 0,
    clubId:'',
    userid:user,
  });

  useEffect(() => {
    const apiUrl = `https://bookclubbackend.onrender.com/club/${clubId}/rating`; // Replace with your actual API URL

    // Replace 'your-token-here' with your actual token
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(apiUrl, config)
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
        setFormData({...formData,clubId:clubId})
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? parseInt(value, 10) : value, // Ensure 'rating' is an integer
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://bookclubbackend.onrender.com/rating',formData,
        {headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',}},);
      if (response.status === 200) {
        swal({
          title: 'Success',
          text: 'Review made successfully',
          icon: 'success',
        });
        location.reload();
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
    } catch (error) {
      alert('Unable to add review');
      console.error(error);
    }
    // You can send this data to your API or perform other actions here
  };

  return (
    <>
    <div>
  <h2>Reviews</h2>
  {Array.isArray(reviews) && reviews.length > 0 ? (
    <Carousel showArrows={true}>
      {reviews.map((review) => (
        <div key={review.id}>
          <h3>{review.title}</h3>
          <p>{review.author}</p>
          <p>{review.content}</p>
        </div>
      ))}
    </Carousel>
  ) : (
    <p>No reviews available.</p>
  )}
</div>
<div>
      <h1>Comment and Rating Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input type="number" id="rating" name="rating" value={formData.rating} min="1" max="5" onChange={handleChange}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
</>
  );
};

export default ReviewsCarousel;
