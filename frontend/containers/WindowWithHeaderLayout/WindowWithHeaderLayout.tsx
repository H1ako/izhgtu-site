// global
import React from 'react'
import {useRecoilState, useSetRecoilState} from "recoil";
// recoil
import {headerActiveHeaderWindowStateAtom, headerActiveStateAtom} from "../../recoilAtoms/headerAtoms";
// components
import InnerBlockHeading from "../../components/InnerBlockHeading/InnerBlockHeading";
// libs
import useScrollbarLock from "../../libs/useScrollbarLock";
// styles and icons
import styles from './WindowWithHeaderLayout.module.scss';

interface WindowWithHeaderLayoutProps {
  className?: string,
  wrapperClassName?: string,
  children: React.ReactNode,
  ToggleButton: React.ReactElement,
  heading?: string
}

function WindowWithHeaderLayout(
  {children, ToggleButton, heading='', className='', wrapperClassName=''}: WindowWithHeaderLayoutProps) {
  const windowId = React.useId()
  const [ activeHeaderWindow, setActiveHeaderWindow ] = useRecoilState(headerActiveHeaderWindowStateAtom);
  const setIsHeaderActive = useSetRecoilState(headerActiveStateAtom)
  const windowRef = React.useRef<HTMLDivElement>(null)
  const {enableScroll, disableScroll} = useScrollbarLock(windowRef)
  
  const toggleMenu = () => {
    setIsHeaderActive(true)
    toggleScrollLockOnActivity()
    
    if (activeHeaderWindow === windowId) {
      setActiveHeaderWindow(null)
    }
    else {
      setActiveHeaderWindow(windowId)
    }
  }
  
  const toggleScrollLockOnActivity = () => {
    if (activeHeaderWindow === windowId) {
      enableScroll()
    }
    else {
      disableScroll()
    }
  }
  
  return (
      <div ref={windowRef} className={`${styles.windowWithHeader} ${className} ${activeHeaderWindow === windowId ? styles.active : ''}`}>
        {React.cloneElement(ToggleButton, {onClick: toggleMenu})}
        <div className={styles.windowWithHeader__content}>
          { heading?.length &&
            <InnerBlockHeading>
              {heading}
            </InnerBlockHeading>
          }
          <div className={`${styles.content__wrapper} ${wrapperClassName}`}>
            {children}
          </div>
        </div>
      </div>
  )
}

export default WindowWithHeaderLayout