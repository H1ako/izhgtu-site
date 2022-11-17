// global
import React from 'react'
// consts
import {
  ANIMATIONS_STOPPED_CLASS,
  IMAGES_HIDDEN_CLASS,
  HIGHLITED_FOCUS_CLASS,
  HIGHLITED_LINKS_CLASS,
  STANDART_FONT_CLASS,
  REMOVED_TRANSITIONS_CLASS, DEFAULT_VALUES
} from "./consts";
// components
import Select, {SelectOption} from "../Select/Select";
import Range from "../Range/Range";
import Toggle from "../Toggle/Toggle";
// additional
import languages from '../../languages.json'
// styles and icons
import '../../styles/components/AccessibilityMenu.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faXmark, faRepeat, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

function AccessibilityMenu() {
  // menu settings
  const [ isMenuVisible, setIsMenuVisible ] = React.useState<boolean>(false)
  const [ isHidden, setIsHidden ] = React.useState<boolean>(false)
  // options
  const [ currentLanguage, setCurrentLanguage ] = React.useState<string>(DEFAULT_VALUES.language)
  const [ saturation, setSaturation ] = React.useState<number | string>(DEFAULT_VALUES.saturation)
  const [ areLinksHighlighted, setLinksHighlighting ] = React.useState<boolean>(DEFAULT_VALUES.highlightLinks)
  const [ isFocusHighlited , setFocusHighlighting ] = React.useState<boolean>(DEFAULT_VALUES.highlightFocus)
  const [ isStandartFont , setIsStandartFont ] = React.useState<boolean>(DEFAULT_VALUES.standartFont)
  const [ areImagesHidden , setHiddenImages ] = React.useState<boolean>(DEFAULT_VALUES.imagesHidden)
  const [ areAnimationStopped , setAnimationStop ] = React.useState<boolean>(DEFAULT_VALUES.animationsStopped)
  const [ areTransitionRemoved , setTransitionRemove ] = React.useState<boolean>(DEFAULT_VALUES.transitionRemoved)
  
  const languagesOption = languages.filter(language => language.active).map(language => {
    const option: SelectOption = {
      value: language.code,
      text: language.name,
      icon: language.icon
    }
    return option
  })
  
  const reset = () => {
    setCurrentLanguage(DEFAULT_VALUES.language)
    setSaturation(DEFAULT_VALUES.saturation)
    setLinksHighlighting(DEFAULT_VALUES.highlightLinks)
    setFocusHighlighting(DEFAULT_VALUES.highlightFocus)
    setIsStandartFont(DEFAULT_VALUES.standartFont)
    setHiddenImages(DEFAULT_VALUES.imagesHidden)
    setAnimationStop(DEFAULT_VALUES.animationsStopped)
    setTransitionRemove(DEFAULT_VALUES.transitionRemoved)
  }

  React.useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return

    
    htmlElement.style.setProperty('--saturation', `${saturation}%`)
  }, [saturation])
  
  React.useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return
    
    if (areLinksHighlighted) htmlElement.classList.add(HIGHLITED_LINKS_CLASS)
    else htmlElement.classList.remove(HIGHLITED_LINKS_CLASS)
    
  }, [areLinksHighlighted])
  
  React.useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return

    if (isFocusHighlited) htmlElement.classList.add(HIGHLITED_FOCUS_CLASS)
    else htmlElement.classList.remove(HIGHLITED_FOCUS_CLASS)
  }, [isFocusHighlited])
  
  React.useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return

    if (isStandartFont) htmlElement.classList.add(STANDART_FONT_CLASS)
    else htmlElement.classList.remove(STANDART_FONT_CLASS)
  }, [isStandartFont])
  
  React.useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return

    if (areImagesHidden) htmlElement.classList.add(IMAGES_HIDDEN_CLASS)
    else htmlElement.classList.remove(IMAGES_HIDDEN_CLASS)
  }, [areImagesHidden])
  
  React.useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return

    if (areAnimationStopped) htmlElement.classList.add(ANIMATIONS_STOPPED_CLASS)
    else htmlElement.classList.remove(ANIMATIONS_STOPPED_CLASS)
  }, [areAnimationStopped])
  
  React.useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return

    if (areTransitionRemoved) htmlElement.classList.add(REMOVED_TRANSITIONS_CLASS)
    else htmlElement.classList.remove(REMOVED_TRANSITIONS_CLASS)
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
              <button className="btns__btn" onClick={reset}>
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
                <Toggle
                  value={areLinksHighlighted}
                  setValue={setLinksHighlighting}
                  name='links-highlighting'
                />
              </span>
            </div>
            <div className="settings__setting">
              <span className="setting__name">Подсветка кликабельного: </span>
              <span className="setting__value">
                <Toggle
                  value={isFocusHighlited}
                  setValue={setFocusHighlighting}
                  name='focus-highlighting'
                />
              </span>
            </div>
            <div className="settings__setting">
              <span className="setting__name">Стандартный шрифт: </span>
              <span className="setting__value">
                <Toggle
                  value={isStandartFont}
                  setValue={setIsStandartFont}
                  name='standart-font'
                />
              </span>
            </div>
            <div className="settings__setting">
              <span className="setting__name">Скрыть картинки: </span>
              <span className="setting__value">
                <Toggle
                  value={areImagesHidden}
                  setValue={setHiddenImages}
                  name='hidden-images'
                />
              </span>
            </div>
            <div className="settings__setting">
              <span className="setting__name">Остановить анимации: </span>
              <span className="setting__value">
                <Toggle
                  value={areAnimationStopped}
                  setValue={setAnimationStop}
                  name='animation-stop'
                />
              </span>
            </div>
            <div className="settings__setting">
              <span className="setting__name">Убрать плавноть: </span>
              <span className="setting__value">
                <Toggle
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
