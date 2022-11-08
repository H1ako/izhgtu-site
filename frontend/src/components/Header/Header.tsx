// global
import React from 'react'
import {useScrollDirection} from "react-use-scroll-direction";
import {Link} from "react-router-dom";
// styles and icons
import './Header.scss';
// components
import AppLogo from "../AppLogo/AppLogo";
import Menu from "../Menu/Menu";
import Profile from "../Profile/Profile";
import NewsMarquee from "../NewsMarquee/NewsMarquee";

interface HeaderProps {
  className?: string
}

// TODO: make skip header button
function Header({className}: HeaderProps) {
  const [ isNewsMarqueeActive, setIsNewsMarqueeActive ] = React.useState<boolean>(true)
  const [ isActive, setIsActive ] = React.useState<boolean>(false)
  const { isScrollingDown, scrollDirection, isScrolling } = useScrollDirection()
  
  const closeNewsMarquee = () => {
    setIsNewsMarqueeActive(false)
  }
  
  const getIsPageScrolled = () => {
    return window.scrollY > 0
  }
  
  const getIsActive = () => {
    return isScrollingDown && getIsPageScrolled()
  }

  React.useEffect(() => {
    if (!scrollDirection) return
    
    setIsActive(getIsActive())
  }, [isScrolling])
  
  return (
      <header className={`${isActive ? 'active' : ''} ${className}`}>
          <div className="header__content">
            { isNewsMarqueeActive &&
              <NewsMarquee className="content__marquee" onClose={closeNewsMarquee} />
            }
            <Menu className="content__menu" />
            <Link to='/' className="content__logo">
              <AppLogo />
            </Link>
            <Profile className="content__profile" />
          </div>
      </header>
  )
}

export default Header
