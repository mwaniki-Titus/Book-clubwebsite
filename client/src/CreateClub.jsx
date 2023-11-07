import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";


const CreateClub = () => {
  const [formData, setFormData] = useState({
    nameOfClub: '',
    description: '',
    imageURL: '',
    location: '',
    dateFounded: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
   const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("https://bookclubbackend.onrender.com/createClub", formData,
      {headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }},);
      // Rest of your code for handling the response
      swal({
        title: 'Success',
        text: 'Club created successfully',
        icon: 'success',
      });
      navigate("/home")
    } catch (error) {
      alert("Check credentials");
      console.error(error);
    }
  };

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <label  htmlFor="nameOfClub">Name of Club:</label>
        <input
          type="text"
          id="nameOfClub"
          name="nameOfClub"
          value={formData.nameOfClub}
          onChange={handleChange}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="imageURL">Image URL:</label>
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <label htmlFor="dateFounded">Date Founded:</label>
        <input
          type="date"
          id="dateFounded"
          name="dateFounded"
          value={formData.dateFounded}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
   
  );
}

export default CreateClub;
