// global
import React from 'react'
// styles and icon
import './Switcher.scss';
// components

interface Props {
  children: React.ReactNode,
  index: number,
  setIndex: (newIndex: number) => void,
  className?: string
}

function Switcher({children, index, setIndex, className=''}: Props) {
  return (
    <div className={`switcher ${className}`}>
      <ul className="switcher__variants">
        { React.Children.map(children, (child, childIndex) => (
          <li className={`variants__variant ${index === childIndex && 'active'}`}>
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
