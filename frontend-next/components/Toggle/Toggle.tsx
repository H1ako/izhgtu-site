// global
import React from 'react'
// styles and icons
import '../../styles/components/Toggle.module.scss';

interface ToggleProps {
  value: boolean,
  setValue: (newValue: boolean | ((oldValue: boolean) => boolean)) => void,
  name: string,
}

function Toggle({value, setValue, name}: ToggleProps) {
  const toggle = () => {
    setValue(state => !state)
  }
  
  const toggleOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      toggle()
    }
  }
  
  return (
    <div className="toggle-container">
      <input
        className="toggle-container__toggle"
        type="checkbox"
        id={`toggle-${name}`}
        name={name}
        checked={value}
        onChange={toggle}
        onKeyUp={toggleOnEnter}
      />
      <label className="toggle-container__label" htmlFor={`toggle-${name}`}
      >
        <span className="label__part label__off">Выкл</span>
        <span className="label__part label__on">Вкл</span>
      </label>
    </div>
  )
}

export default Toggle
