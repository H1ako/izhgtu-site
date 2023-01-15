// global
import React from 'react'
import {useRecoilValue} from "recoil";
// recoil
import {headerActiveStateAtom} from "../../recoilAtoms/headerAtoms";
// styles and icons
import styles from './TabNav.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAward, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";


export interface TabNavProps {
  title?: string,
  className?: string,
  listClassName?: string,
  defaultActiveTabId?: number,
  navTabs: NavTab[],
  setCurrentTabId: React.Dispatch<React.SetStateAction<number>>,
  currentTabId: number,
}

export interface TabNavContentProps {
  className?: string,
  currentTabId: number,
  navTabs: NavTab[],
  tabProps?: React.PropsWithRef<any>
}

export interface NavTabLayoutProps {
  children: React.ReactNode,
  className?: string,
  isActive: boolean,
}

export interface NavTab {
  id: number,
  title: string,
  component: React.ComponentType<any>,
}

interface ActiveTabWidthAndLeft {
  width: number,
  left: number
}

function TabNav({navTabs, currentTabId, setCurrentTabId, title, className='', listClassName=''}: TabNavProps) {
  const isHeaderActive = useRecoilValue(headerActiveStateAtom)
  const tabNavRef = React.useRef<HTMLElement>(null)
  
  const getActiveTabWidthAndLeft = (): ActiveTabWidthAndLeft => {
    const DEFAULT = {
      width: 0,
      left: 0
    }
    const tabNav = tabNavRef.current
    if (!tabNav) return DEFAULT
    
    const activeTab = tabNav.querySelector(`.${styles.nav__list} .item_active`)
    if (!activeTab) return DEFAULT
    
    const left = (activeTab as HTMLDivElement).offsetLeft
    // we don't use offsetWidth because it's not working with initial width because of scrollbar
    const { width } = activeTab.getBoundingClientRect()
    
    return { width, left }
  }
  
  const setPropertyToTabNav = (property: string, value: string) => {
    if (!tabNavRef.current) return
    
    tabNavRef.current.style.setProperty(property, value)
  }
  
  React.useEffect(() => {
    const { width, left } = getActiveTabWidthAndLeft()
    
    setPropertyToTabNav('--highlighterWidth', `${width}px`)
    setPropertyToTabNav('--highlighterLeft', `${left}px`)
  }, [currentTabId])

  return (
    <nav
      ref={tabNavRef}
      aria-label={title}
      className={`${styles.tabNav__nav} ${isHeaderActive ? styles.nav_headerActive : ''} ${className}`}
    >
      <ul className={`${styles.nav__list} ${listClassName}`}>
        {navTabs.map(tab => (
          <li
            key={tab.id}
            className={`${styles.list__item} ${tab.id === currentTabId ? 'item_active' : ''} ${className}`}
          >
            <button className={styles.item__btn} onClick={() => setCurrentTabId(tab.id)}>
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function TabNavContent({currentTabId, navTabs, tabProps, className}: TabNavContentProps) {
  return (
    <div className={`${styles.tabNav__content} ${className}`}>
      { navTabs.map(tab => (
        React.createElement(tab.component, {
          ...tabProps,
          key: tab.id,
          isActive: tab.id === currentTabId,
        })
      ))}
    </div>
  )
}

function NavTabLayout({isActive, children, className=''}: NavTabLayoutProps) {
  return (
    <div className={`${styles.content__tab} ${isActive ? styles.tab_active : ''} ${className}`}>
      {children}
    </div>
  )
}

export {
  TabNavContent,
  NavTabLayout,
  TabNav
}
