// global
import React from 'react'
import Link from "next/link";
import {useRecoilValue} from "recoil";
// recoil
import {headerActiveStateAtom} from "../../recoilAtoms/headerAtoms";
// components
import FacePictureBlock from "../FacePictureBlock/FacePictureBlock";
// styles and icons
import styles from './FacePictureBlockBlured.module.scss';


interface FacePictureBlockBluredProps {
  className?: string,
  bgImage?: string | null,
  children?: React.ReactNode,
}


const FacePictureBlockBlured = ({className='', bgImage, children}: FacePictureBlockBluredProps) => {
  const isHeaderActive = useRecoilValue(headerActiveStateAtom)
  
  return (
    <FacePictureBlock bgImage={bgImage} className={className}>
      <div className={`${styles.faceBlured} ${isHeaderActive ? styles.headerActive : ''}`}>
        {children}
      </div>
    </FacePictureBlock>
  )
}

export default FacePictureBlockBlured
