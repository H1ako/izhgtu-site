// global
import React from 'react'
// components
import OrganizationName from "../OrganizationName/OrganizationName";
import EnrollButton from "../EnrollButton/EnrollButton";
import MainActionBtns from "../MainActionBtns/MainActionBtns";
// styles and icons
import '../../styles/components/FacePictureBlock.module.scss';

interface FacePictureBlockProps {
  className?: string
}

function FacePictureBlock({className=''}: FacePictureBlockProps) {
  return (
    <div className={`face-picture-block ${className}`}>
      <img src="/assets/XXL.png" alt="" className="face-picture-block__picture"/>
      <div className="face-picture-block__inner">
        <MainActionBtns className="inner__btns" />
        <OrganizationName />
        <EnrollButton />
      </div>
    </div>
  )
}

export default FacePictureBlock
