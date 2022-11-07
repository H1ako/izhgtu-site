// global
import React from 'react'
// styles and icons
import './Menu.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faLocationDot, faMagnifyingGlass, faPhone} from "@fortawesome/free-solid-svg-icons";
import {faTelegram, faVk, faYoutube} from "@fortawesome/free-brands-svg-icons"
import {Link} from "react-router-dom";
// components

interface MenuProps {
  className?: string
}

// TODO: make skip header button
function Menu({className}: MenuProps) {
  const [ isMenuVisible, setMenuVisibility ] = React.useState<boolean>(true)
  
  const toggleMenu = () => {
    setMenuVisibility(state => !state)
  }
  
  return (
      <div className={`menu ${className} ${isMenuVisible ? 'active' : ''}`}>
        <button className="menu__toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} className="toggle__icon" />
          <span className="toggle__text">Меню</span>
        </button>
        <div className="menu__content">
          <div className="content__main-btns">
            <button className="main-btns__btn">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="btn__icon" />
              <span className="btn__text">Поиск</span>
            </button>
            <button className="main-btns__btn">
              <FontAwesomeIcon icon={faPhone} className="btn__icon" />
              <span className="btn__text">Позвонить</span>
            </button>
            <button className="main-btns__btn">
              <FontAwesomeIcon icon={faLocationDot} className="btn__icon" />
              <span className="btn__text">На карте</span>
            </button>
          </div>
          <nav>
            <ul className="nav__links">
              <li className="links__links-group">
                <Link to='/' className="links-group__link">Об Университете</Link>
                <ul className="links-group__links">
                  <li className="links__links-group">
                    <Link to='/' className="links-group__link">Персонал</Link>
                  </li>
                </ul>
              </li>
              <li className="links__links-group">
                <Link to='/' className="links-group__link">Новости</Link>
                <ul className="links-group__links">
                  <li className="links__links-group">
                    <Link to='/' className="links-group__link">О Поступлении</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <div className="content__info">
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
        </div>
      </div>
  )
}

export default Menu
