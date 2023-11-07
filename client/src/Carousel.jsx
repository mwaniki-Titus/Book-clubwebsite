import React, { useState, useEffect } from 'react';
import sliderData from './sliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import './Carousel.css';

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = sliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto-slide every 3 seconds (adjust as needed)

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [current]);

  return (
    <div className="carousel">
      <FaArrowAltCircleLeft className="left arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right arrow" onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        return (
          <div
            key={index}
            className={index === current ? 'slide active' : 'slide'}
          >
            {index === current && (
              <img src={slide.image} alt="domestic animal" className="image" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;