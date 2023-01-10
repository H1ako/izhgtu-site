// global
import React from "react";
// styles and icons
import styles from './CheckboxWithText.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";


interface CheckboxWithTextProps {
  text?: string,
  name?: string,
  onChange?: () => void,
  className?: string,
  value: string | number,
  checked?: boolean
}


function CheckboxWithText({text, name, value, onChange, className, checked}: CheckboxWithTextProps) {
  return (
    <label className={styles.checkboxWithText}>
      <input
        type="checkbox"
        className={`${styles.checkboxWithText__nativeInput} ${className}`}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <span className={styles.checkboxWithText__input}>
        <FontAwesomeIcon icon={faCheck} className={styles.input__icon} />
      </span>
      <span className={styles.checkboxWithText__text}>{text}</span>
    </label>
  )
}

export default CheckboxWithText