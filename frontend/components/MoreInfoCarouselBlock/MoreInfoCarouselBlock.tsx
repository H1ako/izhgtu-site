// global
import React from 'react'
import Link from "next/link";
// components
import HorizontalSlider from "../../components/HorizontalSlider/HorizontalSlider";
import BlockHeading from "../BlockHeading/BlockHeading";
// styles and icons
import styles from './MoreInfoCarouselBlock.module.scss';

interface MoreInfoBlockProps {
  className?: string,
  children: React.ReactNode
}

function MoreInfoCarouselBlock({className, children}: MoreInfoBlockProps) {
  return (
    <div className={`${styles.moreInfoCarouselBlock} ${className}`}>
      <BlockHeading>Больше Информации</BlockHeading>
      <HorizontalSlider>
        {children}
      </HorizontalSlider>
    </div>
  )
}

export default MoreInfoCarouselBlock
