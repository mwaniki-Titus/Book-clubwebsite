import Carousel from "./Carousel";
import Navbar from "./Navbar";

const About =()=>{
    return(
        <>
            <Navbar/>
            <div className="aboutDiv">
            <h1>About</h1>
            <p>
        Welcome to our book club community! We are dedicated to the world of
        literature, where every page holds a new adventure. Our mission is to
        bring book lovers together, enabling them to explore the literary world,
        share stories, and build lasting friendships. We believe that books have
        the power to inspire, educate, and entertain, and we aim to foster a
        community that celebrates the magic of books.
      </p>
      <p>
      It all started with a group of friends who developed a common passion and subsequently got together with increasing frequency to enjoy this shared interest.Founded in 2000 and based in San Francisco, our Book Club is a devoted community made up of enthusiastic individuals who enjoy sharing ideas and activities. You`re welcome to browse our site to learn more, and if what we`re doing resonates with you, please don`t hesitate to get in touch.
      </p>
      <Carousel/>
      </div>
        </>
    )
}

export default About;