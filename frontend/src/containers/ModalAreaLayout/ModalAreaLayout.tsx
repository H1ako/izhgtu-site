// global
import React from 'react'
// styles and icons
import './ModalAreaLayout.scss';

interface ModalAreaLayoutProps {
  children: React.ReactNode,
  onClose: () => void,
  className?: string,
  onKeyUp?: (e: React.KeyboardEvent) => void,
  isActive: boolean
}

function ModalAreaLayout({ children, onClose, onKeyUp, isActive, className='' }: ModalAreaLayoutProps) {
  return (
    <div className={`modal-area ${className} ${isActive ? 'active' : ''}`} onKeyUp={onKeyUp}>
      <button className='modal-area__close-btn' onClick={onClose}>Закрыть</button>
      <>
        {children}
      </>
    </div>
  )
}

export default ModalAreaLayout
