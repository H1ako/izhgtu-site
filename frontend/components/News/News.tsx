// global
import React from 'react'
import Link from "next/link";
// styles and icons
import styles from './News.module.scss';


interface NewsProps {
  className?: string,
  newsList: News[],
}

type NewsIndexType = number | null

function News({className='', newsList}: NewsProps) {
  const [ hoveredNews, setHoveredNews ] = React.useState<NewsIndexType>(null)
  
  const setNoCurrentNews = () => {
    setHoveredNews(null)
  }
  
  return (
    <div
      onMouseLeave={setNoCurrentNews}
      className={`${styles.newsContainer} ${className} ${hoveredNews !== null ? styles.active : ''}`}
    >
      <ul className={styles.newsContainer__newsList}>
        {newsList.map((news, index) => (
          <li key={`news-${news.id}`} className={`${styles.newsList__news} ${index === hoveredNews ? styles.active : ''}`}>
            <img src={news.picture ?? ''} alt="" />
            <div className={styles.news__info}>
              <time className={styles.info__date}>{news.date}</time>
              <h3 className={styles.info__heading}>{news.title}</h3>
            </div>
          </li>
        ))}
      </ul>
      <ul className={styles.newsContainer__newsListDuplicate}>
        { newsList.map((news, index) => (
          <li key={`news-duplicate-${news.id}`} onMouseEnter={() => setHoveredNews(index)} className={styles.newsList__news}>
            <Link href={news.postLink ?? ''}>
              <img src={news.picture ?? ''} alt="" className={styles.news__picture}/>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default News
