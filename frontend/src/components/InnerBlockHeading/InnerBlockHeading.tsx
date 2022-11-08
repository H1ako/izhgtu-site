// global
import React from 'react'
// styles and icons
import './InnerBlockHeading.scss';
// components
import BlockHeading from "../BlockHeading/BlockHeading";

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
