// global
import React from "react";
// consts
import {
  ANIMATIONS_STOPPED_CLASS,
  DEFAULT_VALUES,
  HIGHLITED_FOCUS_CLASS,
  HIGHLITED_LINKS_CLASS,
  IMAGES_HIDDEN_CLASS, REMOVED_TRANSITIONS_CLASS,
  STANDART_FONT_CLASS
} from "./consts";

const useOptions = () => {
  const [ currentLanguage, setCurrentLanguage ] = React.useState<string>(DEFAULT_VALUES.language)
  const [ saturation, setSaturation ] = React.useState<number | string>(DEFAULT_VALUES.saturation)
  const [ areLinksHighlighted, setLinksHighlighting ] = React.useState<boolean>(DEFAULT_VALUES.highlightLinks)
  const [ isFocusHighlited , setFocusHighlighting ] = React.useState<boolean>(DEFAULT_VALUES.highlightFocus)
  const [ isStandartFont , setIsStandartFont ] = React.useState<boolean>(DEFAULT_VALUES.standartFont)
  const [ areImagesHidden , setHiddenImages ] = React.useState<boolean>(DEFAULT_VALUES.imagesHidden)
  const [ areAnimationStopped , setAnimationStop ] = React.useState<boolean>(DEFAULT_VALUES.animationsStopped)
  const [ areTransitionRemoved , setTransitionRemove ] = React.useState<boolean>(DEFAULT_VALUES.transitionRemoved)
  
  const reset = (): void => {
    setCurrentLanguage(DEFAULT_VALUES.language)
    setSaturation(DEFAULT_VALUES.saturation)
    setLinksHighlighting(DEFAULT_VALUES.highlightLinks)
    setFocusHighlighting(DEFAULT_VALUES.highlightFocus)
    setIsStandartFont(DEFAULT_VALUES.standartFont)
    setHiddenImages(DEFAULT_VALUES.imagesHidden)
    setAnimationStop(DEFAULT_VALUES.animationsStopped)
    setTransitionRemove(DEFAULT_VALUES.transitionRemoved)
  }
  
  const useOptionObserver = (option: boolean, className: string): void => {
    React.useEffect(() => {
      const html = document.querySelector('html')
      if (!html) return
      
      if (option) {
        html.classList.add(className)
      } else {
        html.classList.remove(className)
      }
    }, [option])
  }

  React.useEffect(() => {
    const html = document.querySelector('html')
    if (!html) return

    html.style.setProperty('--saturation', `${saturation}%`)
  }, [saturation])
  
  useOptionObserver(areLinksHighlighted, HIGHLITED_LINKS_CLASS)
  useOptionObserver(isFocusHighlited, HIGHLITED_FOCUS_CLASS)
  useOptionObserver(isStandartFont, STANDART_FONT_CLASS)
  useOptionObserver(areImagesHidden, IMAGES_HIDDEN_CLASS)
  useOptionObserver(areAnimationStopped, ANIMATIONS_STOPPED_CLASS)
  useOptionObserver(areTransitionRemoved, REMOVED_TRANSITIONS_CLASS)
  
  return {
    currentLanguage,
    setCurrentLanguage,
    saturation,
    setSaturation,
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
  }
}

export default useOptions