import GetStarted from "./GetStarted";

const Landing = ()=>{
    const handleClickScroll = () => {
        const element = document.getElementById('section-1');
        if (element) {
          // 👇 Will scroll smoothly to the top of the next section
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

    return(
        <>
        <div className="appImage" onClick={handleClickScroll}>
          <img className="image1" src="public/pngwing.com (6).png" />
          <img className="image2" src="public/pexels-josh-hild-4256852 1.png" />
          <h1>BOOK NOOK</h1>
          <h3>BOOK CLUB SINCE 2020</h3>
        </div>
        <div id="section-1"><GetStarted/></div>
        </>
    )
}

export default Landing;