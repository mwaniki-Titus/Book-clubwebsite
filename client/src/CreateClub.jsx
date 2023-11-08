import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const all={
  backgroundColor:"#092225",
  height:"43rem",
  marginTop:"5px",
  padding:"55px"
}
const containerStyle = {
  backgroundImage:`url("https://images.pexels.com/photos/8890739/pexels-photo-8890739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
  maxWidth: '400px',
  margin: '0 auto',
  padding: '6%', 
  border: '1px solid #e0e0e0',
  borderRadius: '8px'

};

const labelStyle = {
  display: 'block',
  fontWeight: 'bold',
  marginBottom: '8px',
  color: '#3DB7A2',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  transition: 'border-color 0.3s',
  fontSize: '15px',
};

const inputHoverStyle = {
  ...inputStyle,
  borderColor: '#007bff',
};

const dateInputStyle = {
  width: '100%',
};

const buttonStyle = {
  backgroundColor: '#3DB7A2', // Blue button
  color: '#092225',
  border: 'none',
  borderRadius: '4px',
  padding: '10px 20px',
  marginTop:"20px",
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
   const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("https://bookclubbackend.onrender.com/createClub", formData,
      {headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',}},
        );
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
  <>
  <Navbar/>
  <div style={all} >
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
</div>
  </> 
  );
}

export default CreateClub;
