// global
import React from 'react'
// styles
import styles from './SearchField.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";


interface SearchFieldProps {
  className?: string,
  placeholder?: string,
  value: string,
  setValue: (value: string) => void
}


function SearchField({value, setValue, className='', placeholder='Поиск'}: SearchFieldProps) {
  const id = React.useId()
  
  return (
    <div className={styles.searchField}>
      <label htmlFor={`search-${id}`} className={styles.searchField__label}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.label__icon} />
      </label>
      <input
        id={`search-${id}`}
        className={`${styles.searchField__input} ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

export default SearchField
