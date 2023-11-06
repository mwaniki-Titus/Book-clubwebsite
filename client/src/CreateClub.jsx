import { useState } from "react";
import { Navigate } from "react-router-dom";

const CreateClub =()=>{
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
            const response = await axios.post("https://bookclubbackend.onrender.com/userlogin",formData);
            setData({
              email: "",
              username:"",
              password: ""
             })
             onLogin()
              swal({
                title: 'Success',
                text: 'Logged in successfully',
                icon: 'success',
            });
              navigate("/home")
          } catch (error) {
            alert("Check credentials")
           console.error(error);
          } 
    
        // Do something with the form data, e.g., send it to an API or perform an action
        console.log('Form data submitted:', formData);
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nameOfClub">Name of Club:</label>
            <input
              type="text"
              id="nameOfClub"
              name="nameOfClub"
              value={formData.nameOfClub}
              onChange={handleChange}
            />
          </div>
    
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
    
          <div>
            <label htmlFor="imageURL">Image URL:</label>
            <input
              type="text"
              id="imageURL"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
            />
          </div>
    
          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
    
          <div>
            <label htmlFor="dateFounded">Date Founded:</label>
            <input
              type="date"
              id="dateFounded"
              name="dateFounded"
              value={formData.dateFounded}
              onChange={handleChange}
            />
          </div>
    
          <button type="submit">Submit</button>
        </form>
      );
}

export default CreateClub;