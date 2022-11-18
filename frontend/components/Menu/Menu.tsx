// global
import React from 'react'
import Link from 'next/link';
// components
import WindowWithHeaderLayout from "../../containers/WindowWithHeaderLayout/WindowWithHeaderLayout";
import MainActionBtns from "../MainActionBtns/MainActionBtns";
import SocialsList from "../SocialsList/SocialsList";
// styles and icons
import styles from '../../styles/components/Menu.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

interface MenuProps {
  className?: string
}

function Menu({className}: MenuProps) {
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
          <li className={styles.links__linksGroup}>
            <Link href='/' className={styles.linksGroup__link}>Об Университете</Link>
            <ul className={styles.linksGroup__links}>
              <li className={`${styles.links__linksGroup} ${styles.noLinks}`}>
                <Link href='/' className={styles.linksGroup__link}>Персонал</Link>
              </li>
            </ul>
          </li>
          <li className={styles.links__linksGroup}>
            <Link href='/' className={styles.linksGroup__link}>Новости</Link>
            <ul className={styles.linksGroup__links}>
              <li className={`${styles.links__linksGroup} ${styles.noLinks}`}>
                <Link href='/' className={styles.linksGroup__link}>О Поступлении</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className={styles.menu__info}>
        <div className={styles.info__group}>
          <h3 className={styles.group__heading}>Мы в Соц Сетях</h3>
          <SocialsList />
        </div>
        <div className={styles.info__group}>
          <h3 className={styles.group__heading}>Наши Контакты</h3>
            <ul className={styles.group__list}>
              <li className={styles.list__part}>
                <Link href='/' className={styles.part__text}>
                  +(3412) 77-60-55
                </Link>
              </li>
              <li className={styles.list__part}>
                <Link href='/' className={styles.part__text}>
                  info@istu.ru
                </Link>
              </li>
            </ul>
        </div>
        <div className={styles.info__group}>
          <h3 className={styles.group__heading}>Где Мы Находимся</h3>
            <ul className={styles.group__list}>
              <li className={styles.list__part}>
                <Link href='/' className={styles.part__text}>
                  426069, Удмуртская Республика, г. Ижевск, ул. Студенческая, 7
                </Link>
              </li>
            </ul>
        </div>
      </div>
    </WindowWithHeaderLayout>
  )
}

export default Menu
