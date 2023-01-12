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
  const [ isActive, setIsActive ] = useRecoilState<boolean>(headerActiveStateAtom)
  const activeHeaderWindow = useRecoilValue(headerActiveHeaderWindowStateAtom)
  const [ isNewsMarqueeActive, setIsNewsMarqueeActive ] = React.useState<boolean>(true)
  const scrollDirection = useScrollDirection()
  
  const closeNewsMarquee = (): void => {
    localStorage.setItem('newsMarqueeClosed', 'true')
    localStorage.setItem('newsMarqueeData', 'data')
    setIsNewsMarqueeActive(false)
  }
  
  const getIsActive = (): boolean=> {
    const scrollPosition = document.querySelector<HTMLHtmlElement>('html')?.scrollTop
    
    return scrollDirection !== 'down' || scrollPosition === 0
  }
  
  const toggleOnScrollOrPosition0 = (): void => {
    if (activeHeaderWindow !== null) return
    
    setIsActive(getIsActive())
  }
  
  const toggleNewsMarqueeIfNewData = (): void => {
    const isMarqueeWasClosed = localStorage.getItem('newsMarqueeClosed') === 'true' ? true : false
    if (!isMarqueeWasClosed) return
    
    const oldMarqueeData = localStorage.getItem('newsMarqueeData')
    if (oldMarqueeData !== 'data') return
    
    setIsNewsMarqueeActive(false)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', toggleOnScrollOrPosition0)
    
    return () => window.removeEventListener('scroll', toggleOnScrollOrPosition0)
  }, [scrollDirection])
  
  React.useEffect(() => {
    toggleNewsMarqueeIfNewData()

    return () => {
      localStorage.setItem('newsMarqueeClosed', isNewsMarqueeActive.toString())
      localStorage.setItem('newsMarqueeData', 'data')
    }
  }, [])
  
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