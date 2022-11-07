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
    <h1 className={`block-heading ${className}`}>
      {children}
    </h1>
  )
}

export default BlockHeading
