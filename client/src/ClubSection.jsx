import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const ClubSection = () => {
    const[club,setClub]=useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { clubId } = useParams();


useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      if (clubId) {
        const response = await axios.get(`https://bookclubbackend.onrender.com/clubs/${clubId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setClub([response.data]);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
       };
     
       fetchData();
     }, [clubId]);
     
     if (loading) {
       return <div>Loading...</div>;
     }
     
     if (error) {
       return <div>Error</div>
     }
     
  

    return (
        <>
        <Navbar/>
        {Array.isArray(club)
       ? club.map((item) => (
           <div key={item.clubID}>
             <h2>{item.clubName}</h2>
             <p>{item.location}</p>
             <h3>Associated Books:</h3>
             {item.booksData.map((book,index) => (
                 <div key={book[index].bookID}>
                    <h1>{book[index].bookTitle}</h1>
                   <h4>{book[index].bookAuthor}</h4>
                   <img src={book[index].bookImageURL} alt={book[index].bookTitle} />
                   <button><Link to={`/book/${book[index].bookID}`}>Open</Link></button>
                 </div>
             ))}
           </div>
         ))
       : null}

        </>
      );   
  };

  export default ClubSection;