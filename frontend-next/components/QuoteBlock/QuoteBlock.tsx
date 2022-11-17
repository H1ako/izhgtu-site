// global
import React from 'react'
// components
import InnerBlockHeading from "../InnerBlockHeading/InnerBlockHeading";
// styles and icons
import '../../styles/components/QuoteBlock.module.scss';

interface QuoteBlockProps {
  heading?: string,
  quote: string,
  authorName: string,
  authorPicture?: string,
  authorOccupation?: string,
  className?: string,
}

function QuoteBlock({heading, quote, authorName, authorPicture, authorOccupation, className=''}: QuoteBlockProps) {
  return (
    <div className={`quote-block ${className}`}>
      <InnerBlockHeading>
        {heading}
      </InnerBlockHeading>
      <q className="quote-block__quote">{quote}</q>
      <div className="quote-block__author">
        { authorPicture &&
          <img src={authorPicture} alt="" className="author__picture"/>
        }
        <div className="author__info">
          <h3 className="info__name">{authorName}</h3>
          { authorOccupation &&
            <h4 className="info__occupation">{authorOccupation}</h4>
          }
        </div>
      </div>
    </div>
  )
}

export default QuoteBlock
