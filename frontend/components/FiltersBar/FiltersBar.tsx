// global
import React from 'react'
// components
import SearchField from "../SearchField/SearchField";
// styles
import styles from './FiltersBar.module.scss'


interface FilterValueType {
  name: string,
  value: string
}

enum FilterTypeType {
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
}

interface FilterType {
  name: string,
  type: FilterTypeType,
  values: FilterValueType[]
}

interface FiltersBarProps {
  className?: string,
  filters: FilterType[]
}


function FiltersBar({className='', filters}: FiltersBarProps) {
  const [searchValue, setSearchValue] = React.useState('')
  
  return (
    <aside className={`${styles.filtersBar} ${className}`}>
      <h2 className={styles.filtersBar__heading}>Сортировать по</h2>
      <SearchField
        value={searchValue}
        setValue={setSearchValue}
        placeholder={'Поиск фильтра'}
        className={styles.filtersBar__searchField}
      />
      <ul className={styles.filtersBar__filters}>
        { filters.map(filter => (
          <li key={`filter-${filter.name}`} className={styles.filters__filter}>
            <h3 className={styles.filter__heading}>{filter.name}</h3>
            <ul className={styles.filter__values}>
              { filter.values.map(value => (
                <li key={`filter-${filter.name}-value-${value.name}`} className={styles.values__value}>
                  <label className={styles.value__label}>
                    {/*<input*/}
                    {/*  type={filter.type}*/}
                    {/*  className={styles.label__input}*/}
                    {/*  name={`filter-${filter.name}`}*/}
                    {/*  value={value.value}*/}
                    {/*/>*/}
                    <span className={styles.label__text}>{value.name}</span>
                  </label>
                </li>
              )) }
            </ul>
          </li>
        )) }
      </ul>
    </aside>
  )
}

export default FiltersBar
