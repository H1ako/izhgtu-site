// global
import React from 'react'
// components
import BlockHeading from "../BlockHeading/BlockHeading";
// styles and icons
import './InnerBlockHeading.scss';

interface InnerBlockHeadingProps {
  children: React.ReactNode,
  className?: string
}

function InnerBlockHeading({children, className=''}: InnerBlockHeadingProps) {
  return (
    <BlockHeading className={`inner-block-heading ${className}`}>
      {children}
    </BlockHeading>
  )
}

export default InnerBlockHeading
