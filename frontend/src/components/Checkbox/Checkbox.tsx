// global
import React from 'react'
// styles and icons
import './Checkbox.scss';

interface Props {
  value: boolean,
  setValue: (newValue: boolean | ((oldValue: boolean) => boolean)) => void,
  name: string,
}

function Checkbox({value, setValue, name}: Props) {
  return (
    <div className="checkbox-container">
      <input
        className="checkbox-container__checkbox"
        type="checkbox"
        id={`checkbox-${name}`}
        name={name}
        checked={value}
        onChange={() => setValue(state => !state)}
      />
      <label className="checkbox-container__label" htmlFor={`checkbox-${name}`}
      >
        <span className="label__part label__off">Выкл</span>
        <span className="label__part label__on">Вкл</span>
      </label>
    </div>
  )
}

export default Checkbox
