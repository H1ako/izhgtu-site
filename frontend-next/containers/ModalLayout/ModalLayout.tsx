// global
import React from 'react'
// components
import ModalAreaLayout from "../ModalAreaLayout/ModalAreaLayout";
// styles and icons
import '../../styles/containers/ModalLayout.module.scss';

interface ModalLayoutProps {
  children: React.ReactNode,
  onClose: () => void,
  className?: string,
  isActive: boolean
}

function ModalLayout({ children, onClose, isActive, className='' }: ModalLayoutProps) {
  return (
    <ModalAreaLayout isActive={isActive} className={className} onClose={onClose}>
      <div className="modal">
        <>
          {children}
        </>
      </div>
    </ModalAreaLayout>
  )
}

export default ModalLayout
