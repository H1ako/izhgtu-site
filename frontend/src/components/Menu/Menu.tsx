// global
import React from 'react'
import {Link} from "react-router-dom";
// components
import WindowWithHeaderLayout from "../../containers/WindowWithHeaderLayout/WindowWithHeaderLayout";
import MainActionBtns from "../MainActionBtns/MainActionBtns";
// styles and icons
import './Menu.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faLocationDot, faMagnifyingGlass, faPhone} from "@fortawesome/free-solid-svg-icons";
import {faTelegram, faVk, faYoutube} from "@fortawesome/free-brands-svg-icons"

interface MenuProps {
  className?: string
}

function Menu({className}: MenuProps) {
  return (
    <WindowWithHeaderLayout heading="Меню" className={`menu ${className}`} ToggleButton={
      <button className="menu__toggle">
        <FontAwesomeIcon icon={faBars} className="toggle__icon" />
        <span className="toggle__text">Меню</span>
      </button>
    }>
      <MainActionBtns />
      <nav className="menu__nav">
        <ul className="nav__links">
          <li className="links__links-group">
            <Link to='/' className="links-group__link">Об Университете</Link>
            <ul className="links-group__links">
              <li className="links__links-group no-links">
                <Link to='/' className="links-group__link">Персонал</Link>
              </li>
            </ul>
          </li>
          <li className="links__links-group">
            <Link to='/' className="links-group__link">Новости</Link>
            <ul className="links-group__links">
              <li className="links__links-group no-links">
                <Link to='/' className="links-group__link">О Поступлении</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="menu__info">
        <div className="info__group group-socials">
          <h3 className="group__heading">Мы в Соц Сетях</h3>
          <ul className="group__list">
            <li className="list__part">
              <Link to='/' className='part__text'>
                <FontAwesomeIcon icon={faVk} className="text__icon" />
              </Link>
            </li>
            <li className="list__part">
              <Link to='/' className='part__text'>
                <FontAwesomeIcon icon={faYoutube} className="text__icon" />
              </Link>
            </li>
            <li className="list__part">
              <Link to='/' className='part__text'>
                <FontAwesomeIcon icon={faTelegram} className="text__icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="info__group group-contacts">
          <h3 className="group__heading">Наши Контакты</h3>
            <ul className="group__list">
              <li className="list__part">
                <Link to='/' className='part__text'>
                  +(3412) 77-60-55
                </Link>
              </li>
              <li className="list__part">
                <Link to='/' className='part__text'>
                  info@istu.ru
                </Link>
              </li>
            </ul>
        </div>
        <div className="info__group group-location">
          <h3 className="group__heading">Где Мы Находимся</h3>
            <ul className="group__list">
              <li className="list__part">
                <Link to='/' className='part__text'>
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
