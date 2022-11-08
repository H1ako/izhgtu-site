// global
import React from 'react'
// styles and icons
import './FacePictureBlock.scss';
// components
import OrganizationName from "../OrganizationName/OrganizationName";
import EnrollButton from "../EnrollButton/EnrollButton";

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
