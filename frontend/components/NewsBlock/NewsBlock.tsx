// global
import React from 'react'
// components
import BlockHeading from "../BlockHeading/BlockHeading";
import News from "../News/News";
// styles and icons
import styles from './NewsBlock.module.scss';

interface NewsBlockProps {
  newsList: News[],
}

function NewsBlock({newsList}: NewsBlockProps) {
  return (
    <div className={styles.newsBlock}>
      <BlockHeading>
        Последние новости
      </BlockHeading>
      <News newsList={newsList} />
    </div>
  )
}

export default NewsBlock
