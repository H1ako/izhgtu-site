// global
import React from 'react'
// styles and icons
import './LoaderIcon.scss';
// components
import AppLogo from "../AppLogo/AppLogo";

interface Props {
  className?: string
}

function LoaderIcon({className}: Props) {
  return (
    <AppLogo className={`loader-icon ${className}`} />
  )
}

export default LoaderIcon
