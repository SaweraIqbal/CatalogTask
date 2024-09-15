import React, { Fragment, useEffect, useState } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [ catalogs ] = useState([...catalogsList])
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [isSlideShowActive, setIsSlideShowActive] = useState(false);
 // const [slideTimer, setSlideTimer] = useState(null);
  const [slideDuration] = useState(2000);

  const handleIndex = (index) => {
    setActiveIndex(index);
  };

  const handlePrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? catalogs.length - 1 : (prevIndex - 1) % catalogs.length
    );
  };

  const handleNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % catalogs.length);
  };

  const handlleCheckbox = () => {
    setIsSlideShowActive(!isSlideShowActive);
  };
  
  // Use effect to handle the slideshow when checkbox is toggled
  useEffect(() => {
    let interval;
    if (isSlideShowActive) {
      interval = setInterval(() => {
        handleNextSlide();
      }, slideDuration);
    }

    //  when slideshow is stopped
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSlideShowActive, slideDuration]);

  return (
    <Fragment>
      <h8k-navbar header={ title }></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={ catalogs[activeIndex].image } />
            <div className='layout-row justify-content-center align-items-center mt-20'>
            <button 
              className="icon-only outlined"
              data-testid="prev-slide-btn"
              onClick={handlePrevSlide}
            >
              <i className="material-icons">arrow_back</i>
            </button>
              <Thumbs 
                items={ catalogs } 
                currentIndex={ activeIndex } 
                handleIndex={handleIndex}
              />
            <button 
              className="icon-only outlined"
              data-testid="next-slide-btn"
              onClick={handleNextSlide}
            >
              <i className="material-icons">arrow_forward</i>
            </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input 
            type='checkbox'
            data-testid='toggle-slide-show-button'
            onClick={handlleCheckbox}
          /> 
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

