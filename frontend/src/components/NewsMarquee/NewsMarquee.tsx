// global
import React from 'react'
// components
import Marquee from "react-fast-marquee";
// styles and icons
import './NewsMarquee.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

interface NewsMarqueeProps {
  onClose: () => void,
  className?: string
}

function NewsMarquee({onClose, className}: NewsMarqueeProps) {
  const [ isMarqueePlaying, setIsMarqueePlaying ] = React.useState<boolean>(false)
  const newsMarqueeRef = React.useRef<HTMLDivElement>(null)
  const newsRef = React.useRef<HTMLParagraphElement>(null)
  
  const getIsNewsWidthBiggerMarquee = (): boolean => {
    if (!newsMarqueeRef.current || !newsRef.current) return false
    
    return newsRef.current.offsetWidth > newsMarqueeRef.current.offsetWidth
  }
  
  const onWindowResize = () => {
    
    
    setIsMarqueePlaying(getIsNewsWidthBiggerMarquee())
  }
  
  React.useEffect(() => {
    window.addEventListener('resize', onWindowResize)
    
    return () => window.removeEventListener('resize', onWindowResize)
  }, [])
  
  return (
    <div className={`news-marquee ${className}`} ref={newsMarqueeRef}>
      <Marquee
        gradient={false}
        pauseOnHover={true}
        play={isMarqueePlaying}
        speed={300}
      >
        <div ref={newsRef} className="news-marquee__news">
          <div className="news__part">Выставка инноваций</div>
          <div className="news__part">Осеннняя сессия</div>
        </div>
      </Marquee>
      <button onClick={onClose} className="news-marquee__close-btn">
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  )
}

export default NewsMarquee
