// global
import React from 'react'
import {enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks} from "body-scroll-lock";

export default function useScrollbarLock(allowedElement: React.RefObject<HTMLElement>) {
  const enableScroll = () => {
    if (!allowedElement.current) return
    
    removeBodyScrollbarPadding()
    enableBodyScroll(allowedElement.current)
  }
  
  const disableScroll = () => {
    if (!allowedElement.current) return
    
    setBodyScrollbarPaddingIfNot()
    disableBodyScroll(allowedElement.current)
  }
  
  const setBodyScrollbarPaddingIfNot = () => {
    const isPaddingSet = document.body.style.getPropertyValue('--scroll-padding') ?? false
    if (isPaddingSet) return
    
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth
    const padding = `${scrollBarCompensation}px`
    
    document.body.style.setProperty('--scroll-padding', padding)
  }
  
  const removeBodyScrollbarPadding = () => {
    document.body.style.removeProperty('--scroll-padding')
  }
  
  React.useEffect(() => {
    return () => clearAllBodyScrollLocks()
  }, [])
  
  return {
    enableScroll,
    disableScroll
  }
}