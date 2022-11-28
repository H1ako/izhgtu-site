// global
import React from 'react'
// components
import InnerBlockHeading from "../InnerBlockHeading/InnerBlockHeading";
// styles and icons
import styles from '../../styles/components/QuoteBlock.module.scss';

interface QuoteBlockProps {
  heading?: string,
  quote: string,
  authorName: string,
  authorPicture?: string | null,
  authorOccupation?: string | null,
  className?: string,
}

function QuoteBlock({heading, quote, authorName, authorPicture, authorOccupation, className=''}: QuoteBlockProps) {
  return (
    <div className={`${styles.quoteBlock} ${className}`}>
      <InnerBlockHeading>
        {heading}
      </InnerBlockHeading>
      <q className={styles.quoteBlock__quote} dangerouslySetInnerHTML={{__html: quote}} />
      <div className={styles.quoteBlock__author}>
        { authorPicture &&
          <img src={authorPicture} alt="" className={styles.author__picture}/>
        }
        <div className={styles.author__info}>
          <h3 className={styles.info__name}>{authorName}</h3>
          { authorOccupation &&
            <h4 className={styles.info__occupation}>{authorOccupation}</h4>
          }
        </div>
      </div>
    </div>
  )
}

export default QuoteBlock
