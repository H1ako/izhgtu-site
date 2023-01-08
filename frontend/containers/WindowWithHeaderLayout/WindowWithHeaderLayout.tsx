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
  setExportedData?: any,
  heading?: string
}

function WindowWithHeaderLayout(
  {children, ToggleButton, heading='', className='', wrapperClassName='', setExportedData}: WindowWithHeaderLayoutProps) {
  const windowId = React.useId()
  const [ activeHeaderWindow, setActiveHeaderWindow ] = useRecoilState(headerActiveHeaderWindowStateAtom);
  const setIsHeaderActive = useSetRecoilState(headerActiveStateAtom)
  const windowRef = React.useRef<HTMLDivElement>(null)
  const {enableScroll, disableScroll} = useScrollbarLock(windowRef)
  
  const toggleMenu = () => {
    setIsHeaderActive(true)
    toggleScrollLockOnActivity()
    
    setActiveHeaderWindow(state => {
      if (state === windowId) {
        return null
      }
      return windowId
    })
  }
  
  const toggleScrollLockOnActivity = () => {
    if (activeHeaderWindow === windowId) {
      enableScroll()
    }
    else {
      disableScroll()
    }
  }
  
  React.useEffect(() => {
    if (!setExportedData) return
    
    const data = {
      toggleMenu
    }
    
    setExportedData(data)
  }, [setExportedData])
  
  return (
      <div ref={windowRef} className={`${styles.windowWithHeader} ${className} ${activeHeaderWindow === windowId ? styles.active : ''}`}>
        {React.cloneElement(ToggleButton)}
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