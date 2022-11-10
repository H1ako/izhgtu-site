// global
import React from 'react'
// styles and icons
import './PrincipalQuoteBlock.scss';
import QuoteBlock from "../QuoteBlock/QuoteBlock";
// components

interface PrincipalQuoteBlockProps {
  className?: string,
}

function PrincipalQuoteBlock({className=''}: PrincipalQuoteBlockProps) {
  return (
    <QuoteBlock
      className={className}
      heading="ОБ ИЖГТУ"
      quote="Salesian College Chadstone is a welcoming Catholic community renowned for its integrity and creative learning approaches that bring out the best in boys. Our rich Salesian charism underpinned by the educational principles of founder, St John Bosco, provides the foundation of a future focused pedagogical vision."
      authorName="Губерт александр викторович"
      authorPicture="/assets/principal.jpg"
      authorOccupation="Ректор ИЖГТУ"
    />
  )
}

export default PrincipalQuoteBlock
