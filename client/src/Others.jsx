import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Others = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const{userId}=useParams()
  
  
    useEffect(() => {
      const apiUrl = `https://bookclubbackend.onrender.com/profile/${userId}`;
      axios
        .get(apiUrl)
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, []);

    const handleFollow =async ()=>{
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'https://bookclubbackend.onrender.com/follow',
          { user_id: userId }, // Data to send in the request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.status === 201) {
          // Use 201 status code to indicate successful resource creatio
           alert("User followed")
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        alert('Unable to follow user');
        console.error(error);
      }
    }
  
    return (
      <>
        <Navbar />
        <h1>Personal Profile</h1>
        {loading && <p>Loading user data...</p>}
        {error && <p>Error: {error.message}</p>}
        {userData.name && (
          <div>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <h3>Clubs:</h3>
            <ul>
              {userData.clubs.map((club) => (
                <li key={club.clubID}>{club.clubName}</li>
              ))}
            </ul>
            <h3>Followers:</h3>
            <ul>
              {userData.follower.map((follower) => (
                <li key={follower.user_id}>User ID: {follower.user_id}</li>
              ))}
            </ul>
            <h3>Summaries:</h3>
            <ul>
              {userData.summaries.map((summary,index) => (
                <li key={summary[index].summaryID}>
                  Summary: {summary[index].summary}
                </li>
              ))}
            </ul>
            <button onClick={handleFollow}>Follow</button>
          </div>
          
        )}
      </>
    );
  };
  
  export default Others;
  