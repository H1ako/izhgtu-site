// global
import React from 'react'
import Link from 'next/link';
import {useRecoilValue} from "recoil";
// recoil
import {settingsAtom} from "../../recoilAtoms/settingsAtom";
// components
import WindowWithHeaderLayout, {
  WindowWithHeaderLayoutExportedDataType
} from "../../containers/WindowWithHeaderLayout/WindowWithHeaderLayout";
import MainActionBtns from "../MainActionBtns/MainActionBtns";
import SocialList from "../SocialList/SocialList";
import ContactList from "../ContactList/ContactList";
import LocationList from "../LocationList/LocationList";
// styles and icons
import styles from './Menu.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
// types
import {Settings_settings_MainContentSettings} from "../../graphql/generated";


interface MenuProps {
  className?: string
}

interface ToggleButtonProps {
  toggle?: () => void
}

interface NavbarProps {
  mainContent: Settings_settings_MainContentSettings | null,
  toggle?: () => void
}

interface InfoBlockProps {
  mainContent: Settings_settings_MainContentSettings | null
}

function Menu({className}: MenuProps) {
  const { mainContent }  = useRecoilValue(settingsAtom)
  const [ windowData, setWindowData ] = React.useState<WindowWithHeaderLayoutExportedDataType>(null)
  
  return (
    <WindowWithHeaderLayout
      heading="Меню"
      setExportedData={setWindowData}
      className={`${styles.menu} ${className}`}
      wrapperClassName={styles.menu__wrapper}
      ToggleButton={<ToggleButton toggle={windowData?.toggleMenu} />}
    >
      <MainActionBtns />
      <Navbar mainContent={mainContent} toggle={windowData?.toggleMenu} />
      <InfoBlock mainContent={mainContent} />
    </WindowWithHeaderLayout>
  )
}

function ToggleButton({toggle}: ToggleButtonProps) {
  return (
    <button className={styles.menu__toggle} onClick={toggle}>
      <FontAwesomeIcon icon={faBars} className={styles.toggle__icon} />
      <span className={styles.toggle__text}>Меню</span>
    </button>
  )
}

function Navbar({mainContent, toggle}: NavbarProps) {
  return (
    <nav className={styles.menu__nav}>
      <ul className={styles.nav__links}>
        { mainContent?.header?.menu && mainContent.header.menu.linksGroups.map((linkGroup) => (
          <li key={`link-group-${linkGroup.id}`} className={styles.links__linksGroup}>
            <Link
              onClick={toggle}
              rel={linkGroup.openInNewTab ? "noreferrer" : ''}
              target={linkGroup.openInNewTab ? '_blank' : '_self'}
              href={linkGroup.url ?? linkGroup.page?.url ?? ''}
              className={styles.linksGroup__link}
            >
              {linkGroup.name}
            </Link>
            <ul className={styles.linksGroup__links}>
              { linkGroup.linksGroups && linkGroup.linksGroups.map((linkGroup) => (
                <li key={`link-group-2-${linkGroup.id}`} className={`${styles.links__linksGroup} ${linkGroup.linksGroups?.length == 0 ? styles.noLinks : ''}`}>
                  <Link
                    onClick={toggle}
                    rel={linkGroup.openInNewTab ? "noreferrer" : ''}
                    target={linkGroup.openInNewTab ? '_blank' : '_self'}
                    href={linkGroup.url ?? linkGroup.page?.url ?? ''}
                    className={styles.linksGroup__link}
                  >
                    {linkGroup.name}
                  </Link>
                  <ul className={styles.linksGroup__links}>
                    { linkGroup.linksGroups && linkGroup.linksGroups.map((linkGroup) => (
                      <li key={`link-group-3-${linkGroup.id}`} className={`${styles.links__linksGroup} ${styles.noLinks}`}>
                        <Link
                          onClick={toggle}
                          rel={linkGroup.openInNewTab ? "noreferrer" : ''}
                          target={linkGroup.openInNewTab ? '_blank' : '_self'}
                          href={linkGroup.url ?? linkGroup.page?.url ?? ''}
                          className={styles.linksGroup__link}
                        >
                          {linkGroup.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function InfoBlock({mainContent}: InfoBlockProps) {
  return (
    <div className={styles.menu__info}>
      { mainContent?.header?.socials.length ?
        <div className={styles.info__group}>
          <h3 className={styles.group__heading}>Мы в Соц Сетях</h3>
          <SocialList socials={mainContent.header.socials} />
        </div>
        : null
      }
      { mainContent?.header?.contacts.length ?
        <div className={styles.info__group}>
          <h3 className={styles.group__heading}>Наши Контакты</h3>
          <ContactList contacts={mainContent.header.contacts} />
        </div>
        : null
      }
      { mainContent?.header?.locations.length ?
        <div className={styles.info__group}>
          <h3 className={styles.group__heading}>Где Мы Находимся</h3>
            <LocationList locations={mainContent.header.locations} />
        </div>
        : null
      }
    </div>
  )
}

export default Menu
