// global
import React from 'react'
// styles and icon
import styles from '../../styles/components/Switcher.module.scss';

interface SwitcherProps {
  children: React.ReactNode,
  index: number,
  setIndex: (newIndex: number) => void,
  className?: string
}

function Switcher({children, index, setIndex, className=''}: SwitcherProps) {
  return (
    <div className={`${styles.switcher} ${className}`}>
      <ul className={styles.switcher__variants}>
        { React.Children.map(children, (child, childIndex) => (
          <li className={`${styles.variants__variant} ${index === childIndex && styles.active}`}>
            {React.cloneElement(
              (child as React.ReactElement),
              {onClick: () => setIndex(childIndex)},
              (child as React.ReactElement).props.children
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Switcher
