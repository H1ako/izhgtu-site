import React from 'react'

type ScrollDirectionType = 'up' | 'down' | 'initial'

// useState doesn't work because of rerendering component
let scrollY: number = 0

export default function useScrollDirection(): ScrollDirectionType  {
  const [ scrollDirection, setScrollDirection ] = React.useState<ScrollDirectionType>('initial')
  
  const updateScrollData = () => {
    updateScrollDirection()
    updateScrollY()
  }
  
  const updateScrollY = () => {
    scrollY = window.scrollY
  }
  
  const updateScrollDirection = (): void => {
    const newScrollDirection: ScrollDirectionType = getScrollDirection()
    
    setScrollDirection(newScrollDirection)
  }
  
  const getScrollDirection = (): ScrollDirectionType => {
    const newScrollY: number = window.scrollY
    
    return newScrollY > scrollY ? 'down' : 'up'
  }
  
  
  React.useEffect(() => {
    window.addEventListener('scroll', updateScrollData)
    
    return () => window.removeEventListener('scroll', updateScrollData)
  }, [])
  
  return scrollDirection
}