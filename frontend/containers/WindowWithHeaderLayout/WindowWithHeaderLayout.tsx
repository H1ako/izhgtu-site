// global
import React from 'react'
// components
import InnerBlockHeading from "../../components/InnerBlockHeading/InnerBlockHeading";
// styles and icons
import styles from './WindowWithHeaderLayout.module.scss';

interface WindowWithHeaderLayoutProps {
  className?: string,
  children: React.ReactNode,
  ToggleButton: React.ReactElement,
  heading?: string
}

function WindowWithHeaderLayout({children, ToggleButton, heading='', className=''}: WindowWithHeaderLayoutProps) {
  const [ isActive, setActivity ] = React.useState<boolean>(false)
  
  const toggleMenu = () => {
    setActivity(state => !state)
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
          <div className={styles.content__wrapper}>
            {children}
          </div>
        </div>
      </div>
  )
}

export default WindowWithHeaderLayout
