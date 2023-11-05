import {useNavigate } from "react-router-dom";


const GetStarted = ()=>{
    const navigate = useNavigate();

  const handleGetStartedClick = () => {
    // Navigate to the 'home' route
    navigate('/home');
  };


    return(
        <>
        <div className="getstarted">
            <img className="image2" src="public/pexels-josh-hild-4256852 1.png" />
            <h1>BOOK NOOK</h1>
            <p>Discover the literary oasis you've been searching for. Our book club website is a gateway to worlds uncharted, where stories come alive. Dive into a vibrant community of readers. Join us and embark on a lifelong reading adventure.</p>
            <button onClick={handleGetStartedClick}>Get Started</button>
        </div>
        </>
        )
}

export default GetStarted;