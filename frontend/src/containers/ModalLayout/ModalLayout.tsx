// global
import React from 'react'
// styles and icons
import './ModalLayout.scss';
// components
import ModalAreaLayout from "../ModalAreaLayout/ModalAreaLayout";

interface Props {
  children: React.ReactNode,
  onClose: () => void
}

function ModalLayout({ children, onClose }: Props) {
  return (
    <ModalAreaLayout onClose={onClose}>
      <div className="modal">
        <>
          {children}
        </>
      </div>
    </ModalAreaLayout>
  )
}

export default ModalLayout
