// global
import React from 'react'
// components
import OrganizationName from "../OrganizationName/OrganizationName";
import EnrollButton from "../EnrollButton/EnrollButton";
// styles and icons
import './FacePictureBlock.scss';

interface FacePictureBlockProps {
  className?: string
}

function FacePictureBlock({className=''}: FacePictureBlockProps) {
  return (
    <div className={`face-picture-block ${className}`}>
      <img src="/assets/XXL.png" alt="" className="face-picture-block__picture"/>
      <div className="face-picture-block__inner">
        <OrganizationName />
        <EnrollButton />
      </div>
    </div>
  )
}

export default FacePictureBlock
