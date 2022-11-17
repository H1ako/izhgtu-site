// global
import React from 'react'
// styles and icons
import '../../styles/components/BlockHeading.module.scss';

interface BlockHeadingProps {
  children: React.ReactNode,
  className?: string
}

function BlockHeading({children, className=''}: BlockHeadingProps) {
  return (
    <h1 className={`block-heading ${className}`}>
      {children}
    </h1>
  )
}

export default BlockHeading
