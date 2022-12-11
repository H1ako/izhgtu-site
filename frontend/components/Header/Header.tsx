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
import styles from './Header.module.scss';
import {useRecoilState} from "recoil";
import {headerActiveStateAtom, headerMarqueeActiveStateAtom} from "../../recoilAtoms/headerAtoms";

interface HeaderProps {
  className?: string
}

// TODO: make skip header button
function Header({className}: HeaderProps) {
  const [ isNewsMarqueeActive, setIsNewsMarqueeActive ] = useRecoilState(headerMarqueeActiveStateAtom)
  const [ isActive, setIsActive ] = useRecoilState<boolean>(headerActiveStateAtom)
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
        <Menu />
        <Link href='/' className={styles.content__logo}>
          <AppLogo />
        </Link>
        <Profile />
        { isNewsMarqueeActive &&
          <NewsMarquee className={styles.content__marquee} onClose={closeNewsMarquee} />
        }
      </div>
    </header>
  )
}

export default Header
