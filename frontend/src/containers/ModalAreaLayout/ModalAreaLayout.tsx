// global
import React from 'react'
// styles and icons
import './ModalAreaLayout.scss';

interface Props {
  children: React.ReactNode,
  onClose: () => void,
  className?: string
}

function ModalAreaLayout({ children, onClose, className='' }: Props) {
  return (
    <div className={`modal-area ${className}`}>
      <button className='modal-area__close-btn' onClick={onClose}>Закрыть</button>
      <>
        {children}
      </>
    </div>
  )
}

export default ModalAreaLayout
