// global
import React from 'react'
// styles and icons
import './EnrollButton.scss';
// components

interface EnrollButtonProps {
  className?: string,
  onClick?: () => void,
  text?: string
}

function EnrollButton({text='Поступить', className='', onClick}: EnrollButtonProps) {
  return (
    <button onClick={onClick} className={`enroll-btn ${className}`}>
      {text}
    </button>
  )
}

export default EnrollButton
