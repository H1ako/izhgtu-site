// global
import React from 'react'
// components
import QuoteBlock from "../QuoteBlock/QuoteBlock";
// styles and icons
import '../../styles/components/PrincipalQuoteBlock.module.scss';

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
