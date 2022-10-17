// global
import React from 'react'
// styles and icons
import './Select.scss';
import ModalLayout from "../../containers/ModalLayout/ModalLayout";

export type SelectOptionValueType = string

export interface ISelectOption {
  icon?: string,
  text?: string,
  value: SelectOptionValueType,
}

interface Props {
  options: ISelectOption[],
  value: SelectOptionValueType,
  setValue: (newValue: SelectOptionValueType) => void,
  name: string,
}

function Select({options, value, setValue, name}: Props) {
  const [ currentOption, setCurrentOption ] = React.useState<ISelectOption | undefined>(undefined)
  const [ areOptionsVisible, setAreOptionsVisible ] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    setCurrentOption(options.find(option => option.value === value))
  }, [value])
  
  const updateValue = (value: SelectOptionValueType) => {
    setValue(value)
    setAreOptionsVisible(false)
  }
  
  return (
    <div className="select-container">
      <select className="select-container__native-select" value={value} onChange={e => setValue(e.target.value)} name={name} id={`${name}-select`}>
        {options.map(option => (
          <option value={option.value} key={option.value}>{option.text}</option>
        ))}
      </select>
      <div className="select-container__select">
        <button className="select__value" id="select-label" onClick={() => setAreOptionsVisible(state => !state)}>
          <img src={currentOption?.icon} alt="" className="select__icon value__icon"/>
          <span className="value__text">{currentOption?.text}</span>
        </button>
        { areOptionsVisible &&
          <ModalLayout onClose={() => setAreOptionsVisible(false)}>
            <ul className="select-modal__options" aria-hidden="true">
              {options.map(option => (
                <li key={option.value} aria-selected={value === option.value} className="options__option">
                  <button disabled={option.value === value} className="option__btn" onClick={() => updateValue(option.value)}>
                    {option.icon &&
                      <img src={option.icon} alt="" className="select__icon btn__icon"/>
                    }
                    {option.text &&
                      <span className="btn__text">{option.text}</span>
                    }
                  </button>
                </li>
              ))}
            </ul>
          </ModalLayout>
        }
      </div>
    </div>
  )
}

export default Select
