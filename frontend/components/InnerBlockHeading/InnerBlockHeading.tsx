// global
import React from 'react'
// components
import BlockHeading from "../BlockHeading/BlockHeading";
// styles and icons
import styles from '../../styles/components/InnerBlockHeading.module.scss';

interface InnerBlockHeadingProps {
  children: React.ReactNode,
  className?: string
}

function InnerBlockHeading({children, className=''}: InnerBlockHeadingProps) {
  return (
    <BlockHeading className={`${styles.innerBlockHeading} ${className}`}>
      {children}
    </BlockHeading>
  )
}

export default InnerBlockHeading
