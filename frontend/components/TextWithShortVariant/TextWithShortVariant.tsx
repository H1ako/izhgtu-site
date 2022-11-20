// global
import React from 'react'
// styles and icons
import styles from '../../styles/components/TextWithShortVariant.module.scss'

type FontSizeType = 'small' | 'normal' | 'big'

interface OrganizationNameProps {
  className?: string,
  text: string,
  shortText: string,
  size?: FontSizeType
}

function TextWithShortVariant({className='', text, shortText, size='normal'}: OrganizationNameProps) {
  const getFontSizeClass = () => {
    return `size-${size}`
  }
  return (
    <div className={`${styles.textWithShortVariant} ${getFontSizeClass} ${className}`}>
      <p className={styles.textWithShortVariant__text}>{text}</p>
      <p className={styles.textWithShortVariant__textShort}>{shortText}</p>
    </div>
  )
}

export default TextWithShortVariant
