// global
import React from 'react'
// styles and icons
import './BlockHeading.scss';
// components

interface Props {
  children: React.ReactNode,
  className?: string
}

function BlockHeading({children, className=''}: Props) {
  return (
    <div className={`block-heading ${className}`}>
      {children}
    </div>
  )
}

export default BlockHeading
