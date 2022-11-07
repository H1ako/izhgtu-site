// global
import React from 'react'
// styles and icons
import './WindowWithHeaderLayout.scss';

interface WindowWithHeaderLayoutProps {
  className?: string,
  children: React.ReactNode,
  ToggleButton: React.ReactElement<any>
}

function WindowWithHeaderLayout({className, children, ToggleButton}: WindowWithHeaderLayoutProps) {
  const [ isActive, setActivity ] = React.useState<boolean>(true)
  
  const toggleMenu = () => {
    console.log(1)
    setActivity(state => !state)
  }
  
  return (
      <div className={`window-with-header ${className} ${isActive ? 'active' : ''}`}>
        {React.cloneElement(ToggleButton, {onClick: toggleMenu})}
        <div className="window-with-header__content">
          <div className="content__wrapper">
            {children}
          </div>
        </div>
      </div>
  )
}

export default WindowWithHeaderLayout
