// global
import React from 'react'
import Link from "next/link";
// components
import PostCardLayout from "../../containers/PostCardLayout/PostCardLayout";
// styles and icons
import styles from './News.module.scss';


interface NewsProps {
  className?: string,
  newsList: News[],
}

type NewsIndexType = number | null


function News({className='', newsList}: NewsProps) {
  const [ hoveredNews, setHoveredNews ] = React.useState<NewsIndexType>(null)
  
  const resetCurrentNews = () => {
    setHoveredNews(null)
  }
  
  return (
    <div
      onMouseLeave={resetCurrentNews}
      className={`${styles.newsContainer} ${className} ${hoveredNews !== null ? styles.active : ''}`}
    >
      <ul className={styles.newsContainer__newsList}>
        {newsList.map((news, index) => (
          <PostCardLayout
            key={`news-${news.id}`}
            className={`${styles.newsList__news} ${index === hoveredNews ? styles.active : ''}`}
            infoClassName={styles.news__info}
            title={news.title}
            picture={news.picture ?? ''}
            date={news.date}
          />
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
