// global
import React from 'react'
// styles and icons
import './HorizontalSlider.scss';
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import {faChevronLeft, faChevronRight, faPause, faPlay, faScrewdriverWrench} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// components
import Slider from "react-slick";

interface Props {
  children: React.ReactNode
}

function HorizontalSlider({children}: Props) {
  const [ ref, setRef ] = React.useState<Slider | null>(null)
  const [ paused, setPaused ] = React.useState<boolean>(false)
  
  const toggleAutoplay = () => {
    if (paused) {
      ref?.slickPlay()
    } else {
      ref?.slickPause()
    }
    setPaused(state => !state)
  }
  
  return (
    <div className="slider-container">
      <div className="slider-container__control">
        <button className="control__toggle-control">
          <FontAwesomeIcon icon={faScrewdriverWrench} />
        </button>
        <div className="control__control-menu">
          <button className="control-menu__arrow" onClick={ref?.slickPrev}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="control-menu__toggle" onClick={toggleAutoplay}>
            { paused ?
              <FontAwesomeIcon icon={faPlay} />
              :
              <FontAwesomeIcon icon={faPause} />
            }
          </button>
          <button className="control-menu__arrow" onClick={ref?.slickNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      <div className="slider-container__arrows">
        <button className="arrows__arrow arrows__prev-arrow" onClick={ref?.slickPrev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="arrows__arrow arrows__next-arrow" onClick={ref?.slickNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <Slider
        ref={setRef}
        infinite
        dots
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={3000}
        className="slider-container__slider"
        arrows={false}
        dotsClass="slider__dots"
        pauseOnDotsHover={true}
        slide="div"
        // fade={true}
      >
        {children}
      </Slider>
    </div>
  )
}

export default HorizontalSlider
