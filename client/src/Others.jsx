import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Others = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const{userId}=useParams()
  
  
      const fetchUserData=()=>{
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
        });}
      
   
    useEffect(() => {
        fetchUserData();
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
           fetchUserData();
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        alert('Unable to follow user');
        console.error(error);
      }
    }
  
    return (
      <div className="parentprofile">
      <Navbar />
     <div className="Profile">
       <div className="profileDiv1">
       <h1>Personal Profile</h1>
       <p>welcome to the profile page</p>
       </div>
       <div className="profileDiv2">
       {loading && <p>Loading user data...</p>}
       {error && <p>Error: {error.message}</p>}
       {userData.name && (
         <div>
           <p className="name">{userData.name}</p>
           <p className="email">{userData.email}</p>
           <div className="profileparentContainer">
           <h3>Clubs:</h3>
           <div className="profileContainer">
           <ul>
             {userData.clubs.map((club) => (
               <li key={club.clubID}>{club.clubName}</li>
             ))}
           </ul>
           </div>
           </div>
           <div className="profileparentContainer">
           <h3>Followers:</h3>
           <div className="profileContainer">
           <ul>
             {userData.follower.map((follower) => (
               <li key={follower.user_id}>{follower.name}</li>
             ))}
           </ul>
           </div>
           </div>
           <div className="profileparentContainer">
           <h3>Summaries:</h3>
           <div className="profileContainer">
           <ul>
             {userData.summaries.map((summary,index) => (
               <li key={summary[index].summaryID}>
                 {summary[index].summary}
               </li>
             ))}
           </ul>
           </div>
           </div>
           <div className="button">
           <button onClick={handleFollow}>Follower</button>
           </div>
         </div>
         
       )}
       </div>.
       </div>
     </div>
    );
  };
  
  export default Others;
  