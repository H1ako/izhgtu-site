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
  defaultValue?: string | number,
}

const InputWithHeading = React.forwardRef<HTMLInputElement, InputWithHeadingProps>((
  {children, value, onChange, type, defaultValue, required=false, placeholder='', className='', heading=''}, ref) => {
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
        ref={ref}
        placeholder={placeholder}
        required={required}
        value={value ?? ''}
        onChange={onChange}
        type={type}
        defaultValue={defaultValue}
      />
    </div>
  )
})

export default InputWithHeading