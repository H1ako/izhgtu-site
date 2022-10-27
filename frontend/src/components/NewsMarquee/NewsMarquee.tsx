// global
import React from 'react'
// styles and icons
import './NewsMarquee.scss';
import Marquee from "react-fast-marquee";
// components

function NewsMarquee() {
  const newsMarqueeRef = React.useRef<HTMLDivElement>(null)
  const newsRef = React.useRef<HTMLParagraphElement>(null)
  const [ isMarqueePlaying, setIsMarqueePlaying ] = React.useState<boolean>(false)
  
  const onWindowResize = () => {
    if (!newsMarqueeRef.current || !newsRef.current) return
    
    setIsMarqueePlaying(newsRef.current.offsetWidth > newsMarqueeRef.current.offsetWidth)
  }
  
  React.useEffect(() => {
    window.addEventListener('resize', onWindowResize)
    
    return () => window.removeEventListener('resize', onWindowResize)
  }, [])
  
  return (
    <div className="news-marquee" ref={newsMarqueeRef}>
      <h3 className="news-marquee__heading">Последние Новости</h3>
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
    </div>
  )
}

export default NewsMarquee
