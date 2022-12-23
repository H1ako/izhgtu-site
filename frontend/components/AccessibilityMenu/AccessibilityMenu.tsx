// global
import React from 'react'
// components
import Select, {SelectOption} from "../Select/Select";
import Range from "../Range/Range";
import Toggle from "../Toggle/Toggle";
// additional
import languages from '../../languages.json'
// styles and icons
import styles from './AccessibilityMenu.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faXmark, faRepeat, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import useOptions from "./useOptions";


function AccessibilityMenu() {
  // menu settings
  const [ languagesOptions, setLanguagesOptions ] = React.useState<any>(null)
  const [ isMenuVisible, setIsMenuVisible ] = React.useState<boolean>(false)
  const [ isHidden, setIsHidden ] = React.useState<boolean>(false)
  const {
    saturation,
    setSaturation,
    currentLanguage,
    setCurrentLanguage,
    areLinksHighlighted,
    setLinksHighlighting,
    isFocusHighlited,
    setFocusHighlighting,
    isStandartFont,
    setIsStandartFont,
    areImagesHidden,
    setHiddenImages,
    areAnimationStopped,
    setAnimationStop,
    areTransitionRemoved,
    setTransitionRemove,
    reset
  } = useOptions()
  
  const refactorLanguagesOptions = (): void => {
    const refactoredLanguages = languages.filter(language => language.active).map(language => {
      const option: SelectOption = {
        value: language.code,
        text: language.name,
        icon: language.icon
      }
      return option
    })
    
    setLanguagesOptions(refactoredLanguages)
  }
  
  React.useEffect(() => {
    refactorLanguagesOptions()
  }, [])
  
  return (
    <div className={`${styles.accessibilityMenu} ${isHidden ? styles.hidden : ''}`}>
      { !isMenuVisible &&
        <button className={styles.accessibilityMenu__btn} onClick={() => setIsMenuVisible(state => !state)}>
          <FontAwesomeIcon icon={faGear} />
        </button>
      }
      { isMenuVisible &&
        <div className={styles.accessibilityMenu__menu}>
          <div className={styles.menu__header}>
            <button className={styles.header__closeBtn} onClick={() => setIsMenuVisible(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3 className={styles.header__heading}>
              <FontAwesomeIcon icon={faGear} />
              <span>Настройка сайта</span>
            </h3>
            <div className={styles.header__btns}>
              <button className={styles.btns__btn} onClick={reset}>
                <FontAwesomeIcon icon={faRepeat} />
                Сбросить
              </button>
              <button className={styles.btns__btn} onClick={() => setIsHidden(true)}>
                <FontAwesomeIcon icon={faEyeSlash} />
                Скрыть
              </button>
            </div>
          </div>
          <div className={styles.menu__settings}>
            <div className={styles.settings__setting}>
              <span className={styles.setting__name}>Язык: </span>
              <span className={styles.setting__value}>
                <Select
                  options={languagesOptions}
                  value={currentLanguage}
                  setValue={setCurrentLanguage}
                  name="language"
                />
              </span>
            </div>
            <div className={styles.settings__setting}>
              <span className={styles.setting__name}>Насыщенность: </span>
              <span className={styles.setting__value}>
                <Range
                  value={saturation}
                  setValue={setSaturation}
                  name='saturation'
                  maxValue={300}
                />
              </span>
            </div>
            <div className={styles.settings__setting}>
              <span className={styles.setting__name}>Подсветка Ссылок: </span>
              <span className={styles.setting__value}>
                <Toggle
                  value={areLinksHighlighted}
                  setValue={setLinksHighlighting}
                  name='links-highlighting'
                />
              </span>
            </div>
            <div className={styles.settings__setting}>
              <span className={styles.setting__name}>Подсветка кликабельного: </span>
              <span className={styles.setting__value}>
                <Toggle
                  value={isFocusHighlited}
                  setValue={setFocusHighlighting}
                  name='focus-highlighting'
                />
              </span>
            </div>
            <div className={styles.settings__setting}>
              <span className={styles.setting__name}>Стандартный шрифт: </span>
              <span className={styles.setting__value}>
                <Toggle
                  value={isStandartFont}
                  setValue={setIsStandartFont}
                  name='standart-font'
                />
              </span>
            </div>
            <div className={styles.settings__setting}>
              <span className={styles.setting__name}>Скрыть картинки: </span>
              <span className={styles.setting__value}>
                <Toggle
                  value={areImagesHidden}
                  setValue={setHiddenImages}
                  name='hidden-images'
                />
              </span>
            </div>
            <div className={styles.settings__setting}>
              <span className={styles.setting__name}>Остановить анимации: </span>
              <span className={styles.setting__value}>
                <Toggle
                  value={areAnimationStopped}
                  setValue={setAnimationStop}
                  name='animation-stop'
                />
              </span>
            </div>
            <div className={styles.settings__setting}>
              <span className={styles.setting__name}>Убрать плавноть: </span>
              <span className={styles.setting__value}>
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
