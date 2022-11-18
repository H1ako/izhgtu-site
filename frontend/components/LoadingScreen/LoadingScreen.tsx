// global
import React from 'react'
// recoil atoms
import {useRecoilValue} from "recoil";
import {loadingScreenAtom} from "../../recoilAtoms/loadingAtom";
// components
import LoaderIcon from "../LoaderIcon/LoaderIcon";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";
// styles and icons
import styles from '../../styles/components/LoadingScreen.module.scss';

interface LoadingScreenProps {
  transition?: number
}

// TODO: Fix bug with empty space
function LoadingScreen({transition=600}: LoadingScreenProps) {
  const isActive = useRecoilValue(loadingScreenAtom)
  
  const toggleScrollOnActive = () => {
    const body = document.querySelector('body')
    if (!body) return
    
    if (isActive) {
      disableBodyScroll(body)
    }
    else {
      setTimeout(() => {
        enableBodyScroll(body)
      }, transition)
      
    }
  }
  
  React.useEffect(() => {
    console.log(isActive && 'active')
    toggleScrollOnActive()
  }, [isActive])
  
  return (
    <div
      className={`${styles.loadingScreen} ${isActive ? styles.active : ''}`}
      style={{"--transition": `${transition}ms`} as React.CSSProperties}
    >
      <div className={`${styles.loadingScreen__side} ${styles.leftSide}`}>
        <LoaderIcon />
        <h2>ЗАГРУЗКА...</h2>
      </div>
      <div className={`${styles.loadingScreen__side} ${styles.rightSide}`}>
        <LoaderIcon />
        <h2>ЗАГРУЗКА...</h2>
      </div>
    </div>
  )
}

export default LoadingScreen
