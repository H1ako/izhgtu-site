// global
import React from 'react'
import Link from "next/link";
// components
import HorizontalSlider from "../../components/HorizontalSlider/HorizontalSlider";
import BlockHeading from "../BlockHeading/BlockHeading";
// styles and icons
import '../../styles/components/MoreInfoBlock.module.scss';

interface MoreInfoBlockProps {
  className?: string
}

function MoreInfoBlock({className}: MoreInfoBlockProps) {
  return (
    <div className={`more-info-block ${className}`}>
      <BlockHeading>Больше Информации</BlockHeading>
      <HorizontalSlider>
        <Link className="more-info-block__slide" href="/" style={{"--index":  0} as React.CSSProperties}>
          <img src="/assets/s2.jpg" alt=""/>
        </Link>
        <Link className="more-info-block__slide" href="/" style={{"--index":  1} as React.CSSProperties}>
          <img src="/assets/s1.jpg" alt=""/>
        </Link>
        <Link className="more-info-block__slide" href="/" style={{"--index":  2} as React.CSSProperties}>
          <img src="/assets/s3.jpg" alt=""/>
        </Link>
      </HorizontalSlider>
    </div>
  )
}

export default MoreInfoBlock
