// global
import React from 'react'
// components
import ModalAreaLayout from "../ModalAreaLayout/ModalAreaLayout";
// styles and icons
import './ModalLayout.scss';

interface ModalLayoutProps {
  children: React.ReactNode,
  onClose: () => void,
  className?: string
}

function ModalLayout({ children, onClose, className='' }: ModalLayoutProps) {
  return (
    <ModalAreaLayout className={className} onClose={onClose}>
      <div className="modal">
        <>
          {children}
        </>
      </div>
    </ModalAreaLayout>
  )
}

export default ModalLayout
