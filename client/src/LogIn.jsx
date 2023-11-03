import React, { useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";




function Login() {
    const [data,setData]= useState({
      email: "",
      username:"",
      password: ""
    })

    const { email,username,password } = data;

    let navigate = useNavigate();
 
      const signIn = async (e) => {
        e.preventDefault();
        
        try {
          const response = await axios.post("https://bookclubbackend.onrender.com/userlogin",data);
          alert("Welcome back")
          setData({
            email: "",
            username:"",
            password: ""
           })
            navigate("/")
            let res = response.data.access_token
         localStorage.setItem('token', res ); // Store the token in localStorage
        } catch (error) {
          alert("User not found")
         console.error(error);
        } 
      };
      
  
    return (
        <div className="sign-in-container">
        <form onSubmit={signIn}>
            <h1>Log In to your Account</h1>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setData({...data, email: e.target.value})}></input>
            <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setData({...data, username:e.target.value})}></input>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setData({...data, password:e.target.value})}></input>
            <button type="submit">Log In</button>
        </form>
        <button><Link to="/signup">Don't have an account</Link></button>

    </div>
    )
  }
  
  export default Login