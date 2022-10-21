// global
import React from 'react'
// styles and icons
import './Toggle.scss';

interface Props {
  value: boolean,
  setValue: (newValue: boolean | ((oldValue: boolean) => boolean)) => void,
  name: string,
}

function Toggle({value, setValue, name}: Props) {
  return (
    <div className="toggle-container">
      <input
        className="toggle-container__toggle"
        type="checkbox"
        id={`toggle-${name}`}
        name={name}
        checked={value}
        onChange={() => setValue(state => !state)}
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
