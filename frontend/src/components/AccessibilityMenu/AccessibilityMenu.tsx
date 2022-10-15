// global
import React from 'react'
// styles and icons
import './AccessibilityMenu.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faXmark, faRepeat, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import Select, {ISelectOption} from "../Select/Select";
import languages from '../../languages.json'


function AccessibilityMenu() {
  const [ isMenuVisible, setIsMenuVisible ] = React.useState<boolean>(false)
  const languagesOption = languages.filter(language => language.active).map(language => {
    const option: ISelectOption = {
      value: language.code,
      text: language.name,
      icon: language.icon
    }
    return option
  })
  console.log(languagesOption)
  
  return (
    <div className="accessibility-menu">
      <button className="accessibility-menu__btn" onClick={() => setIsMenuVisible(state => !state)}>
        <FontAwesomeIcon icon={faGear} />
      </button>
      <div className="accessibility-menu__menu">
        <div className="menu__header">
          <button className="header__close-btn">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h3 className="header__heading">
            <FontAwesomeIcon icon={faGear} />
            <span>Настройка сайта</span>
          </h3>
          <div className="header__btns">
            <button className="btns__btn">
              <FontAwesomeIcon icon={faRepeat} />
              Сбросить
            </button>
            <button className="btns__btn">
              <FontAwesomeIcon icon={faEyeSlash} />
              Скрыть
            </button>
          </div>
        </div>
        <div className="menu__settings">
          <div className="settings__setting">
            <span className="setting__name">Язык: </span>
            <span className="setting__value">
              <Select options={languagesOption} defaultValue="ru" name="language" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccessibilityMenu
