// global
import React from 'react'
// styles and icons
import styles from './FacePictureBlock.module.scss';

interface FacePictureBlockProps {
  className?: string,
  bgImage?: string | null,
  children?: React.ReactNode,
}

const FacePictureBlock = React.forwardRef<HTMLDivElement, FacePictureBlockProps>(
  ({className='', bgImage, children}, ref) => {
  return (
    <div ref={ref} className={`${styles.facePictureBlock} ${className}`}>
      <img src={bgImage ?? ''} alt="" className={styles.facePictureBlock__picture}/>
      <div className={styles.facePictureBlock__inner}>
        {children}
      </div>
    </div>
  )
})

export default FacePictureBlock
