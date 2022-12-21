// global
import React from 'react'
// styles and icons
import styles from './ModalAreaLayout.module.scss';

interface ModalAreaLayoutProps {
  children: React.ReactNode,
  onClose: () => void,
  className?: string,
  onKeyUp?: (e: React.KeyboardEvent) => void,
  isActive: boolean
}

function ModalAreaLayout({ children, onClose, onKeyUp, isActive, className='' }: ModalAreaLayoutProps) {
  return (
    <div className={`${styles.modalArea} ${className} ${isActive ? styles.active : ''}`} onKeyUp={onKeyUp}>
      <button className={styles.modalArea__closeBtn} onClick={onClose}>Закрыть</button>
      <>
        {children}
      </>
    </div>
  )
}

export default ModalAreaLayout
