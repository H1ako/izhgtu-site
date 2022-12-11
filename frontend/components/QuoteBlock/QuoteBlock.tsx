// global
import React from 'react'
// components
import InnerBlockHeading from "../InnerBlockHeading/InnerBlockHeading";
// styles and icons
import styles from './QuoteBlock.module.scss';
import UserMiniCard from "../UserMiniCard/UserMiniCard";

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
      <UserMiniCard userName={authorName} userPicture={authorPicture} userOccupation={authorOccupation} />
    </div>
  )
}

export default QuoteBlock
