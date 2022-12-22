// global
import React from 'react'
import { useRecoilState } from 'recoil'
// recoil atoms
import {lightboxImageSrcAtom} from "../../recoilAtoms/lightboxAtom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// components
import Slider from "react-slick";
// styles and icons
import styles from './HorizontalSlider.module.scss';
import {
  faChevronLeft,
  faChevronRight,
  faPause,
  faPlay,
  faUpRightAndDownLeftFromCenter
} from "@fortawesome/free-solid-svg-icons";


interface HorizontalSliderProps {
  children: React.ReactNode,
  className?: string
}


function HorizontalSlider({children, className=''}: HorizontalSliderProps) {
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
      className={`${styles.sliderContainer} ${className}`}
    >
      <div className={styles.sliderContainer__arrows}>
        <button className={styles.arrows__arrow} onClick={sliderRef?.slickPrev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className={styles.arrows__arrow} onClick={sliderRef?.slickNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <Slider
        ref={setSliderRef}
        infinite
        speed={500}
        slidesToShow={1}
        centerPadding="10%"
        slidesToScroll={1}
        autoplay
        centerMode
        autoplaySpeed={3000}
        className={styles.sliderContainer__slider}
        arrows={false}
      >
        {children}
      </Slider>
      <div className={styles.sliderContainer__btns}>
        <button className={styles.menu__btn} onClick={toggleAutoplay}>
          { paused ?
            <FontAwesomeIcon icon={faPlay} />
            :
            <FontAwesomeIcon icon={faPause} />
          }
        </button>
        <button className={styles.menu__btn} onClick={openLightbox}>
          <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
        </button>
      </div>
    </div>
  )
}

export default HorizontalSlider
