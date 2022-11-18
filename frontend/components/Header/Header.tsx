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
import styles from '../../styles/components/Header.module.scss';

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
      <header className={`${styles.mainHeader} ${isActive ? styles.active : ''} ${className}`}>
          <div className={styles.mainHeader__content}>
            { isNewsMarqueeActive &&
              <NewsMarquee className={styles.content__marquee} onClose={closeNewsMarquee} />
            }
            <Menu />
            <Link href='/' className={styles.content__logo}>
              <AppLogo />
            </Link>
            <Profile />
          </div>
      </header>
  )
}

export default Header
