// global
import React from 'react'
// styles and icons
import './WindowWithHeaderLayout.scss';
// components
import InnerBlockHeading from "../../components/InnerBlockHeading/InnerBlockHeading";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";

interface WindowWithHeaderLayoutProps {
  className?: string,
  children: React.ReactNode,
  ToggleButton: React.ReactElement,
  heading?: string
}

function WindowWithHeaderLayout({className, children, ToggleButton, heading=''}: WindowWithHeaderLayoutProps) {
  const [ isActive, setActivity ] = React.useState<boolean>(false)
  
  const toggleMenu = () => {
    const body = document.querySelector('body')
    if (!body) return
    
    if (isActive) {
      enableBodyScroll(body)
    }
    else {
      disableBodyScroll(body)
    }
    setActivity(state => !state)
  }
  
  return (
      <div className={`window-with-header ${className} ${isActive ? 'active' : ''}`}>
        {React.cloneElement(ToggleButton, {onClick: toggleMenu})}
        <div className="window-with-header__content">
          { heading?.length &&
            <InnerBlockHeading>
              {heading}
            </InnerBlockHeading>
          }
          <div className="content__wrapper">
            {children}
          </div>
        </div>
      </div>
  )
}

export default WindowWithHeaderLayout
