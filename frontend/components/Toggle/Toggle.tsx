// global
import React from 'react'
// styles and icons
import styles from '../../styles/components/Toggle.module.scss';

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
    <div className={styles.toggleContainer}>
      <input
        className={styles.toggleContainer__toggle}
        type="checkbox"
        id={`toggle-${name}`}
        name={name}
        checked={value}
        onChange={toggle}
        onKeyUp={toggleOnEnter}
      />
      <label className={styles.toggleContainer__label} htmlFor={`toggle-${name}`}
      >
        <span className={styles.label__part}>Выкл</span>
        <span className={styles.label__part}>Вкл</span>
      </label>
    </div>
  )
}

export default Toggle
