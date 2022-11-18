// global
import React from 'react'
// components
import BlockHeading from "../BlockHeading/BlockHeading";
import News from "../News/News";
// styles and icons
import styles from '../../styles/components/NewsBlock.module.scss';

function NewsBlock() {
  return (
    <div className={styles.newsBlock}>
      <BlockHeading>
        Последние новости
      </BlockHeading>
      <News />
    </div>
  )
}

export default NewsBlock
