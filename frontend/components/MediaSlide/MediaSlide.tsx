// global
import React from 'react'
// styles and icons
import styles from './MediaSlide.module.scss';

export type MediaSlideType = 'video' | 'picture'

interface MoreInfoBlockProps {
  className?: string,
  type: MediaSlideType,
  src: string,
  link?: string
}

function MediaSlide({className, type, src}: MoreInfoBlockProps) {
  const getContent = (): React.ReactNode => {
    if (type === 'picture') {
      return (
        <img src={`/media/${src}`} alt="" />
      )
    }
    else if (type === 'video') {
      return (
        <video src={`/media/${src}`} controls />
      )
    }
    else {
      return null
    }
  }
  
  return (
    <div className={`${styles.mediaSlide} ${className}`}>
      {getContent()}
    </div>
  )
}

export default MediaSlide
