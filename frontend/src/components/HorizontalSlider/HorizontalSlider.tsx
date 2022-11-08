// global
import React from 'react'
import { useRecoilState } from 'recoil'
// recoil atoms
import {lightboxImageSrcAtom} from "../../recoilAtoms/lightboxAtom";
// styles and icons
import './HorizontalSlider.scss';
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import {
  faChevronLeft,
  faChevronRight, faEye,
  faEyeSlash,
  faPause,
  faPlay,
  faScrewdriverWrench, faUpRightAndDownLeftFromCenter
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// components
import Slider from "react-slick";

interface Props {
  children: React.ReactNode
}

function HorizontalSlider({children}: Props) {
  const [ ref, setRef ] = React.useState<Slider | null>(null)
  const [ isControlVisible, setControlVisibly ] = React.useState<boolean>(false)
  const [ areSliderElementsVisible, setSliderElementsVisibility ] = React.useState<boolean>(true)
  const [ paused, setPaused ] = React.useState<boolean>(false)
  const [ lightboxImageSrc, setLightboxImageSrc ] = useRecoilState(lightboxImageSrcAtom)
  
  const toggleAutoplay = (): void => {
    if (!ref) return
    
    if (paused) {
      ref.slickPlay()
    } else {
      ref.slickPause()
    }
    setPaused(state => !state)
  }
  
  const openLightbox = (): void => {
    const currentSlideImage = document.querySelector<HTMLImageElement>('.slick-current img')
    if (!currentSlideImage) return
    
    const imageSrc = getImageSrc(currentSlideImage)
    setLightboxImageSrc(imageSrc)
  }
  
  const getImageSrc = (image: HTMLImageElement): string => {
    return image.attributes.getNamedItem('src')?.value ?? ''
  }
  
  const toggleHidingElements = (): void => {
    setSliderElementsVisibility(state => !state)
  }
  
  const toggleControl = (): void => {
    setControlVisibly(state => !state)
  }
  
  const openControl = (): void => {
    setControlVisibly(true)
  }
  
  const closeControl = (): void => {
    setControlVisibly(false)
  }
  
  return (
    <div
      className='slider-container'
    >
      <button className="menu__btn menu__toggle-autoplay" onClick={toggleAutoplay}>
        { paused ?
          <FontAwesomeIcon icon={faPlay} />
          :
          <FontAwesomeIcon icon={faPause} />
        }
      </button>
      <button className="control__toggle" onClick={toggleControl} onMouseEnter={openControl}>
        <FontAwesomeIcon icon={faScrewdriverWrench} />
      </button>
      <button className="menu__btn menu__toggle-lightbox" onClick={openLightbox}>
        <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
      </button>
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
        // dots
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay
        autoplaySpeed={3000}
        className="slider-container__slider"
        arrows={false}
      >
        {children}
      </Slider>
    </div>
  )
}

export default HorizontalSlider