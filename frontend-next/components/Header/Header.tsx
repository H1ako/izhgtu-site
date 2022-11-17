// global
import React from 'react'
import Link from "next/link";
// components
import AppLogo from "../AppLogo/AppLogo";
import Menu from "../Menu/Menu";
import Profile from "../Profile/Profile";
import NewsMarquee from "../NewsMarquee/NewsMarquee";
import useScrollDirection from "../../libs/useScrollDirection";
// styles and icons
import '../../styles/components/Header.module.scss';

interface HeaderProps {
  className?: string
}

// TODO: make skip header button
function Header({className}: HeaderProps) {
  const [ isNewsMarqueeActive, setIsNewsMarqueeActive ] = React.useState<boolean>(true)
  const [ isActive, setIsActive ] = React.useState<boolean>(false)
  const scrollDirection = useScrollDirection()
  
  const closeNewsMarquee = () => {
    setIsNewsMarqueeActive(false)
  }
  
  const getIsPageScrolled = (): boolean => {
    return window.scrollY > 0
  }
  
  const getIsActive = () : boolean=> {
    return scrollDirection == 'down'
  }
  
  const toggleOnScroll = (): void => {
    const newIsActive = getIsActive()
    
    setIsActive(newIsActive)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', toggleOnScroll)
    
    return () => window.removeEventListener('scroll', toggleOnScroll)
  
  }, [scrollDirection])
  
  return (
      <header className={`main-header ${isActive ? 'active' : ''} ${className}`}>
          <div className="main-header__content">
            { isNewsMarqueeActive &&
              <NewsMarquee className="content__marquee" onClose={closeNewsMarquee} />
            }
            <Menu className="content__menu" />
            <Link href='/' className="content__logo">
              <AppLogo />
            </Link>
            <Profile className="content__profile" />
          </div>
      </header>
  )
}

export default Header
