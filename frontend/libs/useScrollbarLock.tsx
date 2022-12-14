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
    
    addBodyScrollbarPadding()
    disableBodyScroll(allowedElement.current)
  }
  
  
  const addBodyScrollbarPadding = () => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth
    const padding = `${scrollBarCompensation}px`
    
    document.body.style.setProperty('--scrollbar-padding', padding)
  }
  
  const removeBodyScrollbarPadding = () => {
    document.body.style.removeProperty('--scrollbar-padding')
  }
  
  
  
  React.useEffect(() => {
    return () => {
      clearAllBodyScrollLocks();
    }
  }, [])
  
  return {
    enableScroll,
    disableScroll
  }
}