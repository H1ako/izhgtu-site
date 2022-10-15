// global
import React from 'react'
// styles and icons
import './Select.scss';

export type SelectOptionValue = number | string

export interface ISelectOption {
  icon?: string,
  text?: string,
  value: SelectOptionValue,
}

interface Props {
  options: ISelectOption[],
  defaultValue?: SelectOptionValue,
  name: string,
}

function Select({options, defaultValue, name}: Props) {
  const [ currentValue, setCurrentValue ] = React.useState<SelectOptionValue | undefined>(defaultValue)
  const [ currentOption, setCurrentOption ] = React.useState<ISelectOption | undefined>(undefined)
  const [ areOptionsVisible, setAreOptionsVisible ] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    setCurrentOption(options.find(option => option.value === currentValue))
  }, [currentValue])
  
  return (
    <div className="select-container">
      <select className="select-container__native-select" value={currentValue} onChange={e => setCurrentValue(e.target.value)} name={name} id={`${name}-select`}>
        {options.map(option => (
          <option value={option.value} key={option.value}>{option.text}</option>
        ))}
      </select>
      <div className="select-container__select">
        <button className="select__value" id="select-label" onClick={() => setAreOptionsVisible(state => !state)}>{currentOption?.text}</button>
        <ul className="select__options" aria-hidden="true">
          {options.map(option => (
            <li key={option.value} aria-selected={defaultValue === option.value} className="options__option">
              <button className="option__btn" onClick={() => setCurrentValue(option.value)}>
                {option.icon &&
                  <img src={option.icon} alt="" className="option__icon"/>
                }
                {option.text &&
                  <span className="option__text">{option.text}</span>
                }
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Select
