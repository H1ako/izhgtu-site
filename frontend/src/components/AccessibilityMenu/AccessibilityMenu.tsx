// global
import React from 'react'
// styles and icons
import './AccessibilityMenu.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faXmark, faRepeat, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import Select, {ISelectOption} from "../Select/Select";
import languages from '../../languages.json'
import Range from "../Range/Range";
import Checkbox from "../Checkbox/Checkbox";

const defaultValues = {

}


function AccessibilityMenu() {
  // menu settings
  const [ isMenuVisible, setIsMenuVisible ] = React.useState<boolean>(true)
  const [ isHidden, setIsHidden ] = React.useState<boolean>(false)
  // options
  const [ currentLanguage, setCurrentLanguage ] = React.useState<string>('ru')
  const [ saturation, setSaturation ] = React.useState<number | string>(100)
  const [ areLinksHighlighted, setLinksHighlighting ] = React.useState<boolean>(false)
  const [ isFocusHighlited , setFocusHighlighting ] = React.useState<boolean>(false)
  const [ isStandartFont , setIsStandartFont ] = React.useState<boolean>(false)
  const [ areImagesHidden , setHiddenImages ] = React.useState<boolean>(false)
  const [ areAnimationStopped , setAnimationStop ] = React.useState<boolean>(false)
  const [ areTransitionRemoved , setTransitionRemove ] = React.useState<boolean>(false)
  
  const languagesOption = languages.filter(language => language.active).map(language => {
    const option: ISelectOption = {
      value: language.code,
      text: language.name,
      icon: language.icon
    }
    return option
  })

  React.useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return

    htmlElement.style.setProperty('--saturation', `${saturation}%`)
  }, [saturation])
  
  React.useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return

    htmlElement.style.setProperty('--saturation', `${saturation}%`)
  }, [areLinksHighlighted])
  
  React.useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return

    htmlElement.style.setProperty('--saturation', `${saturation}%`)
  }, [isFocusHighlited])
  
  React.useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return

    htmlElement.style.setProperty('--saturation', `${saturation}%`)
  }, [isStandartFont])
  
  React.useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return

    htmlElement.style.setProperty('--saturation', `${saturation}%`)
  }, [areImagesHidden])
  
  React.useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return

    htmlElement.style.setProperty('--saturation', `${saturation}%`)
  }, [areAnimationStopped])
  
  React.useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return

    htmlElement.style.setProperty('--saturation', `${saturation}%`)
  }, [areTransitionRemoved])
  
  return (
    <div className={`accessibility-menu ${isHidden && 'hidden'}`}>
      { !isMenuVisible &&
        <button className="accessibility-menu__btn" onClick={() => setIsMenuVisible(state => !state)}>
          <FontAwesomeIcon icon={faGear} />
        </button>
      }
      { isMenuVisible &&
        <div className="accessibility-menu__menu">
          <div className="menu__header">
            <button className="header__close-btn" onClick={() => setIsMenuVisible(false)}>
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
              <button className="btns__btn" onClick={() => setIsHidden(true)}>
                <FontAwesomeIcon icon={faEyeSlash} />
                Скрыть
              </button>
            </div>
          </div>
          <div className="menu__settings">
            <div className="settings__setting">
              <span className="setting__name">Язык: </span>
              <span className="setting__value">
                <Select
                  options={languagesOption}
                  value={currentLanguage}
                  setValue={setCurrentLanguage}
                  name="language"
                />
              </span>
            </div>
            <div className="settings__setting">
              <span className="setting__name">Насыщенность: </span>
              <span className="setting__value">
                <Range
                  value={saturation}
                  setValue={setSaturation}
                  name='saturation'
                  maxValue={300}
                />
              </span>
            </div>
            <div className="settings__setting">
              <span className="setting__name">Подсветка Ссылок: </span>
              <span className="setting__value">
                <Checkbox
                  value={areLinksHighlighted}
                  setValue={setLinksHighlighting}
                  name='links-highlighting'
                />
              </span>
            </div>
            <div className="settings__setting">
              <span className="setting__name">Подсветка кликабельного: </span>
              <span className="setting__value">
                <Checkbox
                  value={isFocusHighlited}
                  setValue={setFocusHighlighting}
                  name='focus-highlighting'
                />
              </span>
            </div>
            <div className="settings__setting">
              <span className="setting__name">Стандартный шрифт: </span>
              <span className="setting__value">
                <Checkbox
                  value={isStandartFont}
                  setValue={setIsStandartFont}
                  name='standart-font'
                />
              </span>
            </div>
            <div className="settings__setting">
              <span className="setting__name">Скрыть картинки: </span>
              <span className="setting__value">
                <Checkbox
                  value={areImagesHidden}
                  setValue={setHiddenImages}
                  name='hidden-images'
                />
              </span>
            </div>
            <div className="settings__setting">
              <span className="setting__name">Остановить анимации: </span>
              <span className="setting__value">
                <Checkbox
                  value={areAnimationStopped}
                  setValue={setAnimationStop}
                  name='animation-stop'
                />
              </span>
            </div>
            <div className="settings__setting">
              <span className="setting__name">Убрать плавноть: </span>
              <span className="setting__value">
                <Checkbox
                  value={areTransitionRemoved}
                  setValue={setTransitionRemove}
                  name='transition-remove'
                />
              </span>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default AccessibilityMenu
