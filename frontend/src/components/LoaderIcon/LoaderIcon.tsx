// global
import React from 'react'
// components
import AppLogo from "../AppLogo/AppLogo";
// styles and icons
import './LoaderIcon.scss';

interface LoaderIconProps {
  className?: string
}

function LoaderIcon({className}: LoaderIconProps) {
  return (
    <AppLogo className={`loader-icon ${className}`} />
  )
}

export default LoaderIcon
