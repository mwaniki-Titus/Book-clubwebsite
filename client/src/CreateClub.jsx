import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";


const containerStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#ede6f5', 
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  
};

const labelStyle = {
  display: 'block',
  fontWeight: 'bold',
  marginBottom: '8px',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  transition: 'border-color 0.3s',
  fontSize: '14px',
};

const inputHoverStyle = {
  ...inputStyle,
  borderColor: '#007bff',
};

const dateInputStyle = {
  width: '100%',
};

const buttonStyle = {
  backgroundColor: '#007bff', // Blue button
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '10px 20px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  fontSize: '16px',
};

const buttonHoverStyle = {
  ...buttonStyle,
  backgroundColor: '#0056b3',
  transform: 'scale(1.05)',
};

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://bookclubbackend.onrender.com/userlogin", formData);
      // Rest of your code for handling the response
    } catch (error) {
      alert("Check credentials");
      console.error(error);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle} htmlFor="nameOfClub">Name of Club:</label>
        <input
          style={inputStyle}
          type="text"
          id="nameOfClub"
          name="nameOfClub"
          value={formData.nameOfClub}
          onChange={handleChange}
        />

        <label style={labelStyle} htmlFor="description">Description:</label>
        <textarea
          style={inputStyle}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label style={labelStyle} htmlFor="imageURL">Image URL:</label>
        <input
          style={inputStyle}
          type="text"
          id="imageURL"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
        />

        <label style={labelStyle} htmlFor="location">Location:</label>
        <input
          style={inputStyle}
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <label style={labelStyle} htmlFor="dateFounded">Date Founded:</label>
        <input
          style={dateInputStyle}
          type="date"
          id="dateFounded"
          name="dateFounded"
          value={formData.dateFounded}
          onChange={handleChange}
        />

        <button style={buttonStyle} type="submit">Submit</button>
      </form>
    </div>
   
  );
}

export default CreateClub;
