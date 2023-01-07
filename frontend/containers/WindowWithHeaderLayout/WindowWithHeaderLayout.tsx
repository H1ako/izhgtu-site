// global
import React from 'react'
// components
import InnerBlockHeading from "../../components/InnerBlockHeading/InnerBlockHeading";
// styles and icons
import styles from './WindowWithHeaderLayout.module.scss';
import {useRecoilState, useSetRecoilState} from "recoil";
import {headerBlockStateAtom} from "../../recoilAtoms/headerAtoms";

interface WindowWithHeaderLayoutProps {
  className?: string,
  wrapperClassName?: string,
  children: React.ReactNode,
  ToggleButton: React.ReactElement,
  heading?: string
}

function WindowWithHeaderLayout(
  {children, ToggleButton, heading='', className='', wrapperClassName=''}: WindowWithHeaderLayoutProps) {
  const [ isHeaderBlocked, setHeaderBlock ] = useRecoilState(headerBlockStateAtom)
  const setIsHeaderActive = useSetRecoilState(headerBlockStateAtom)
  const [ isActive, setActivity ] = React.useState<boolean>(false)
  
  const toggleMenu = () => {
    setIsHeaderActive(true)
    toggleHeaderBlockOnActivity()
    
    setActivity(state => !state)
  }
  
  const toggleHeaderBlockOnActivity = () => {
    if (isActive) {
      setHeaderBlock(false)
    }
    else {
      setHeaderBlock(true)
    }
  }
  
  return (
      <div className={`${styles.windowWithHeader} ${className} ${isActive ? styles.active : ''}`}>
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
