// global
import React from 'react'
import { useRecoilState } from 'recoil'
// recoil atoms
import {lightboxImageSrcAtom} from "../../recoilAtoms/lightboxAtom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// components
import Slider from "react-slick";
// styles and icons
import '../../styles/components/HorizontalSlider.module.scss';
import "slick-carousel/slick/slick.css";
import {
  faChevronLeft,
  faChevronRight,
  faPause,
  faPlay,
  faUpRightAndDownLeftFromCenter
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  children: React.ReactNode,
  className?: string
}

function HorizontalSlider({children, className=''}: Props) {
  const [ paused, setPaused ] = React.useState<boolean>(false)
  const [ lightboxImageSrc, setLightboxImageSrc ] = useRecoilState(lightboxImageSrcAtom)
  const [ sliderRef, setSliderRef ] = React.useState<Slider | null>(null)
  
  const toggleAutoplay = (): void => {
    if (!sliderRef) return
    
    if (paused) {
      sliderRef.slickPlay()
    } else {
      sliderRef.slickPause()
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
  
  return (
    <div
      className={`slider-container ${className}`}
    >
      <div className="slider-container__arrows">
        <button className="arrows__arrow arrows__prev-arrow" onClick={sliderRef?.slickPrev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="arrows__arrow arrows__next-arrow" onClick={sliderRef?.slickNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <Slider
        ref={setSliderRef}
        infinite
        speed={500 }
        slidesToShow={1}
        centerPadding="10%"
        slidesToScroll={1}
        autoplay
        centerMode
        autoplaySpeed={3000}
        className="slider-container__slider"
        arrows={false}
      >
        {children}
      </Slider>
      <div className="slider-container__btns">
        <button className="menu__btn menu__toggle-autoplay" onClick={toggleAutoplay}>
          { paused ?
            <FontAwesomeIcon icon={faPlay} />
            :
            <FontAwesomeIcon icon={faPause} />
          }
        </button>
        <button className="menu__btn menu__toggle-lightbox" onClick={openLightbox}>
          <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
        </button>
      </div>
    </div>
  )
}

export default HorizontalSlider
