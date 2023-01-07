// global
import React from 'react'
// styles and icons
import styles from './FacePictureBlock.module.scss';

interface FacePictureBlockProps {
  className?: string,
  bgImage?: string | null,
  children?: React.ReactNode,
}

function FacePictureBlock({className='', bgImage, children}: FacePictureBlockProps) {
  return (
    <div className={`${styles.facePictureBlock} ${className}`}>
      <img src={bgImage ?? ''} alt="" className={styles.facePictureBlock__picture}/>
      <div className={styles.facePictureBlock__inner}>
        {children}
      </div>
    </div>
  )
}

export default FacePictureBlock
