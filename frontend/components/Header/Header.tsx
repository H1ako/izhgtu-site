// global
import React from 'react'
import Link from "next/link";
import {useRecoilState, useRecoilValue} from "recoil";
import {useQuery} from "@apollo/client";
// recoil
import {settingsAtom} from "../../recoilAtoms/settingsAtom";
import {headerActiveHeaderWindowStateAtom, headerActiveStateAtom} from "../../recoilAtoms/headerAtoms";
// components
import AppLogo from "../AppLogo/AppLogo";
import Menu from "../Menu/Menu";
import Profile from "../Profile/Profile";
import NewsMarquee from "../NewsMarquee/NewsMarquee";
// libs
import useScrollDirection from "../../libs/useScrollDirection";
// styles and icons
import styles from './Header.module.scss';

interface HeaderProps {
  className?: string
}

// TODO: make skip header button
function Header({className}: HeaderProps) {
  const { mainContent }  = useRecoilValue(settingsAtom)
  const [ isNewsMarqueeActive, setIsNewsMarqueeActive ] = React.useState<boolean>(true)
  const [ isActive, setIsActive ] = useRecoilState<boolean>(headerActiveStateAtom)
  const activeHeaderWindow = useRecoilValue(headerActiveHeaderWindowStateAtom)
  const scrollDirection = useScrollDirection()
  
  const closeNewsMarquee = () => {
    setIsNewsMarqueeActive(false)
  }
  
  const getIsActive = () : boolean=> {
    return scrollDirection !== 'down'
  }
  
  const toggleOnScroll = (): void => {
    if (activeHeaderWindow !== null) return
    
    setIsActive(getIsActive())
  }

  React.useEffect(() => {
    window.addEventListener('scroll', toggleOnScroll)
    
    return () => window.removeEventListener('scroll', toggleOnScroll)
  
  }, [scrollDirection])
  
  return (
    <header className={`${styles.mainHeader} ${isActive ? '' : styles.active} ${className}`}>
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
