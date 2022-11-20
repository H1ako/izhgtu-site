// global
import React from 'react'
// components
import TextWithShortVariant from "../TextWithShortVariant/TextWithShortVariant";
import EnrollButton from "../EnrollButton/EnrollButton";
import MainActionBtns from "../MainActionBtns/MainActionBtns";
// styles and icons
import styles from '../../styles/components/FacePictureBlock.module.scss';

interface FacePictureBlockProps {
  className?: string,
  bgImage?: string,
  
}

function FacePictureBlock({className='', bgImage}: FacePictureBlockProps) {
  return (
    <div className={`${styles.facePictureBlock} ${className}`}>
      <img src={bgImage} alt="" className={styles.facePictureBlock__picture}/>
      <div className={styles.facePictureBlock__inner}>
        <MainActionBtns className={styles.inner__btns} />
        <TextWithShortVariant
          text="Федеральное государственное бюджетное образовательное учреждение высшего образования"
          shortText="ФГБОУ ВО"
          size="normal"
        />
        <TextWithShortVariant
          text="Ижевский государственный технический университет имени М.Т. Калашникова"
          shortText="ИжГТУ имени М.Т. Калашникова"
          size="big"
        />
        <EnrollButton />
      </div>
    </div>
  )
}

export default FacePictureBlock
