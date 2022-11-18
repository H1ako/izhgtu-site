// global
import React from 'react'
// components
import ModalLayout from "../../containers/ModalLayout/ModalLayout";
// styles and icons
import styles from '../../styles/components/Select.module.scss';

export type SelectOptionValueType = string

export interface SelectOption {
  icon?: string,
  text?: string,
  value: SelectOptionValueType,
}

interface Props {
  options: SelectOption[],
  value: SelectOptionValueType,
  setValue: (newValue: SelectOptionValueType) => void,
  name: string,
}

function Select({options, value, setValue, name}: Props) {
  const [ currentOption, setCurrentOption ] = React.useState<SelectOption | undefined>(undefined)
  const [ areOptionsVisible, setOptionsVisibility ] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    const newOption = getOptionByValue()
    
    setCurrentOption(newOption)
  }, [value, options])
  
  const getOptionByValue = () => {
    return options.find(option => option.value === value)
  }
  
  const optionClickHandler = (value: SelectOptionValueType) => {
    setValue(value)
    closeOptions()
  }
  
  const closeOptions = () => {
    setOptionsVisibility(false)
  }
  
  return (
    <div className={styles.selectContainer}>
      <select className={styles.selectContainer__native} value={value} onChange={e => setValue(e.target.value)} name={name} id={`${name}-select`}>
        {options.map(option => (
          <option value={option.value} key={option.value}>{option.text}</option>
        ))}
      </select>
      <div className={styles.selectContainer__select}>
        <button className={styles.select__value} id="select-label" onClick={() => setOptionsVisibility(state => !state)}>
          <img src={currentOption?.icon} alt="" className={styles.select__icon}/>
          <span>{currentOption?.text}</span>
        </button>
        <ModalLayout isActive={areOptionsVisible} onClose={() => setOptionsVisibility(false)}>
          <ul className={styles.selectModal__options} aria-hidden="true">
            {options.map((option, key) => (
              <li key={option.value} className={styles.options__option}>
                <button autoFocus={key === 0} disabled={option.value === value} className={styles.option__btn} onClick={() => optionClickHandler(option.value)}>
                  {option.icon &&
                    <img src={option.icon} alt="" className={styles.select__icon}/>
                  }
                  {option.text &&
                    <span>{option.text}</span>
                  }
                </button>
              </li>
            ))}
          </ul>
        </ModalLayout>
      </div>
    </div>
  )
}

export default Select
