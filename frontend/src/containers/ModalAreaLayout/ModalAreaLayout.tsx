// global
import React from 'react'
// styles and icons
import './ModalAreaLayout.scss';

interface Props {
  children: React.ReactNode,
  onClose: () => void
}

function ModalAreaLayout({ children, onClose }: Props) {
  return (
    <div className="modal-area">
      <button className='modal-area__close-btn' onClick={onClose}>Закрыть</button>
      <>
        {children}
      </>
    </div>
  )
}

export default ModalAreaLayout
