// global
import React from 'react'
// components
import OrganizationName from "../OrganizationName/OrganizationName";
import EnrollButton from "../EnrollButton/EnrollButton";
import MainActionBtns from "../MainActionBtns/MainActionBtns";
// styles and icons
import styles from '../../styles/components/FacePictureBlock.module.scss';

interface FacePictureBlockProps {
  className?: string
}

function FacePictureBlock({className=''}: FacePictureBlockProps) {
  return (
    <div className={`${styles.facePictureBlock} ${className}`}>
      <img src="/assets/XXL.png" alt="" className={styles.facePictureBlock__picture}/>
      <div className={styles.facePictureBlock__inner}>
        <MainActionBtns className={styles.inner__btns} />
        <OrganizationName />
        <EnrollButton />
      </div>
    </div>
  )
}

export default FacePictureBlock
