// global
import React from 'react'
// components
import AppLogo from "../AppLogo/AppLogo";
// styles and icons
import '../../styles/components/LoaderIcon.module.scss';

interface LoaderIconProps {
  className?: string
}

function LoaderIcon({className}: LoaderIconProps) {
  return (
    <AppLogo className={`loader-icon ${className}`} />
  )
}

export default LoaderIcon
