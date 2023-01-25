// global
import React from "react";
// styles
import styles from './InputWithHeading.module.scss';

interface InputWithHeadingProps {
  className?: string,
  children?: React.ReactNode,
  heading?: string,
  type: React.HTMLInputTypeAttribute,
  value: string | number | null,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  required?: boolean,
}

function InputWithHeading({children, value, onChange, type, required=false, placeholder='', className='', heading=''}: InputWithHeadingProps) {
  return (
    <div className={`${styles.inputWithHeading} ${className}`}>
      <h3 className={styles.inputWithHeading__heading}>
        {heading}
        { required &&
          <span className={styles.heading__required} title="Обязательно для заполнения">*</span>
        }
      </h3>
      {children}
      <input
        className={styles.inputWithHeading__input}
        placeholder={placeholder}
        required={required}
        value={value ?? ''}
        onChange={onChange}
        type={type}
      />
    </div>
  )
}

export default InputWithHeading