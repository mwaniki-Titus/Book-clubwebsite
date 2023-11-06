import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


const Register = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username:"",
        email: "",
        password: "",
        role: "",
    });

    const { first_name, last_name,username, email, password, role } = formData;
    
    let navigate = useNavigate()

    const signUp = async (e) => {
        e.preventDefault();
        

        try {
            const response = await axios.post("https://bookclubbackend.onrender.com/usersignup", formData);
            console.log(response.data); 
        } catch (error) {
            console.error(error);
        }
          
        
        alert("User created")
        
        
        // Clear the form inputs after submission
        setFormData({
            first_name: "",
            last_name: "",
            username:"",
            email: "",
            password: "",
            role: "",
        });

        navigate("/login")
        
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={signUp}>
                <h1>Create Account</h1>
                <input type="text" placeholder="Enter your first name.." value={first_name} onChange={(e) =>setFormData({ ...formData, first_name: e.target.value })}/>
                <input type="text" placeholder="Enter your last name.." value={last_name} onChange={(e) =>setFormData({ ...formData, last_name: e.target.value })}/>
                 <input type="text" placeholder="Enter your username.." value={username} onChange={(e) =>setFormData({ ...formData, username: e.target.value })}/>
                <input type="email" placeholder="Enter your email.." value={email} onChange={(e) => setFormData({ ...formData, email: e.target.value }) }/>
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) =>setFormData({ ...formData, password: e.target.value })}/>
                <input type="text" placeholder="Enter your role as User" value={role} onChange={(e) =>setFormData({ ...formData, role: e.target.value })}/>
                <button type="submit">Sign Up</button>
            </form>
            <button>
            <Link to="/login">Already have an account</Link>
            </button>
        </div>
    );
};

export default Register;