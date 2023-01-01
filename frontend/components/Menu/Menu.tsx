// global
import React from 'react'
import Link from 'next/link';
import {useRecoilValue} from "recoil";
// recoil
import {settingsAtom} from "../../recoilAtoms/settingsAtom";
// components
import WindowWithHeaderLayout from "../../containers/WindowWithHeaderLayout/WindowWithHeaderLayout";
import MainActionBtns from "../MainActionBtns/MainActionBtns";
import SocialList from "../SocialList/SocialList";
import ContactList from "../ContactList/ContactList";
// styles and icons
import styles from './Menu.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import LocationList from "../LocationList/LocationList";


interface MenuProps {
  className?: string
}

function Menu({className}: MenuProps) {
  const { mainContent }  = useRecoilValue(settingsAtom)
  
  return (
    <WindowWithHeaderLayout heading="Меню" className={`${styles.menu} ${className}`} ToggleButton={
      <button className={styles.menu__toggle}>
        <FontAwesomeIcon icon={faBars} className={styles.toggle__icon} />
        <span className={styles.toggle__text}>Меню</span>
      </button>
    }>
      <MainActionBtns />
      <nav className={styles.menu__nav}>
        <ul className={styles.nav__links}>
          { mainContent?.header?.menu && mainContent.header.menu.linksGroups.map((linkGroup) => (
            <li className={styles.links__linksGroup}>
              <Link target={linkGroup.openInNewTab ? '_blank' : '_self'} href={linkGroup.url ?? linkGroup.page?.url ?? ''} className={styles.linksGroup__link}>{linkGroup.name}</Link>
              <ul className={styles.linksGroup__links}>
                { linkGroup.linksGroups && linkGroup.linksGroups.map((linkGroup) => (
                  <li className={`${styles.links__linksGroup} ${linkGroup.linksGroups?.length == 0 ? styles.noLinks : ''}`}>
                    <Link target={linkGroup.openInNewTab ? '_blank' : '_self'} href={linkGroup.url ?? linkGroup.page?.url ?? ''} className={styles.linksGroup__link}>{linkGroup.name}</Link>
                    <ul className={styles.linksGroup__links}>
                      { linkGroup.linksGroups && linkGroup.linksGroups.map((linkGroup) => (
                        <li className={`${styles.links__linksGroup} ${styles.noLinks}`}>
                          <Link target={linkGroup.openInNewTab ? '_blank' : '_self'} href={linkGroup.url ?? linkGroup.page?.url ?? ''} className={styles.linksGroup__link}>{linkGroup.name}</Link>
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
    </WindowWithHeaderLayout>
  )
}

export default Menu
