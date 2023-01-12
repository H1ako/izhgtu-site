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

interface WindowWithHeaderLayoutExportedData {
  toggleMenu: () => void
}

export type WindowWithHeaderLayoutExportedDataType = WindowWithHeaderLayoutExportedData | null

function WindowWithHeaderLayout(
  {children, ToggleButton, heading='', className='', wrapperClassName='', setExportedData}: WindowWithHeaderLayoutProps) {
  const windowId = React.useId()
  const [ activeHeaderWindow, setActiveHeaderWindow ] = useRecoilState(headerActiveHeaderWindowStateAtom);
  const windowRef = React.useRef<HTMLDivElement>(null)
  const setIsHeaderActive = useSetRecoilState(headerActiveStateAtom)
  const {enableScroll, disableScroll} = useScrollbarLock(windowRef)
  
  const toggleMenu = () => {
    setIsHeaderActive(true)
    
    setActiveHeaderWindow(state => {
      const newState = state === windowId ? null : windowId
      
      toggleScrollLockOnState(newState)
      
      return newState
    })
  }
  
  const toggleScrollLockOnState = (state: IdType | null) => {
    if (state !== null) {
      disableScroll()
    }
    else {
      enableScroll()
    }
  }
  
  React.useEffect(() => {
    if (!setExportedData) return
    
    const data: WindowWithHeaderLayoutExportedData = {
      toggleMenu
    }
    
    setExportedData(data)
  }, [setExportedData])
  
  return (
      <div
        ref={windowRef}
        className={`${styles.windowWithHeader} ${className} ${activeHeaderWindow === windowId ? styles.active : ''}`}
      >
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