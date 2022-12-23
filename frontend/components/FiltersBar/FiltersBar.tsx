// global
import React from 'react'
// components
import SearchField from "../SearchField/SearchField";
// styles
import styles from './FiltersBar.module.scss'
import DateRange from "../DateRange/DateRange";


interface FilterValueType {
  name: string,
  value: string
}

enum FilterTypeType {
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
}

interface FilterCheckboxType {
  name: string,
  type: FilterTypeType,
  values: FilterValueType[]
}

interface FilterDateType {
  name: string,
  type: FilterTypeType,
  values: []
}

interface FiltersBarProps {
  className?: string,
  filters: (FilterDateType | FilterCheckboxType)[]
}

interface FilterValuesProps {
  values: FilterValueType[],
  filterName: string,
  filterType: FilterTypeType,
}

interface FilterDateProps {
  endDate: Date | null,
  startDate: Date | null,
  setEndDate: (date: Date | null) => void,
  setStartDate: (date: Date | null) => void,
}

interface FilterCheckboxProps {
  name: string,
  value: string,
  checked: boolean,
}


function FiltersBar({className='', filters}: FiltersBarProps) {
  const [ searchValue, setSearchValue ] = React.useState('')
  
  return (
    <aside className={`${styles.filtersBar} ${className}`}>
      <h1 className={styles.filtersBar__heading}>Сортировать по</h1>
      <SearchField
        value={searchValue}
        setValue={setSearchValue}
        placeholder={'Поиск фильтра'}
        className={styles.filtersBar__searchField}
      />
      <ul className={styles.filtersBar__filters}>
        { filters.map(filter => (
          <li key={`filter-${filter.name}`} className={styles.filters__filter}>
            <h2 className={styles.filter__heading}>{filter.name}</h2>
            <FilterValues
              values={filter.values}
              filterName={filter.name}
              filterType={filter.type}
            />
          </li>
        )) }
      </ul>
    </aside>
  )
}


function FilterValues({values, filterName, filterType}: FilterValuesProps) {
  if (filterType === FilterTypeType.CHECKBOX) {
    const [ checkedValues, setCheckedValues ] = React.useState<string[]>([])
    
    return (
      <ul className={styles.filter__values}>
        { values.map(value => (
          <li key={`filter-${filterName}-value-${value.name}`} className={styles.values__value}>
            <FilterCheckbox
              name={value.name}
              value={value.value}
              checked={checkedValues.includes(value.value)}
            />
          </li>
        )) }
      </ul>
    )
  }
  else if (filterType === FilterTypeType.DATE) {
    const [ startDate, setStartDate ] = React.useState<Date | null>(null)
    const [ endDate, setEndDate ] = React.useState<Date | null>(null)
    
    return (
      <FilterDate
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    )
  }
  
  return (
    <ul className={styles.filter__values}>
      { values.map(value => (
        <li key={`filter-${filterName}-value-${value.name}`} className={styles.values__value}>
          <label className={styles.value__label}>
            <input
              type={filterType}
              className={styles.label__input}
              name={`filter-${filterName}`}
              value={value.value}
            />
            <span className={styles.label__text}>{value.name}</span>
          </label>
        </li>
      )) }
    </ul>
  )
}


function FilterDate({startDate, endDate, setStartDate, setEndDate}: FilterDateProps) {
  return (
    <DateRange
      startDate={startDate}
      endDate={endDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      className={styles.value__dateRange}
    />
  )
}


function FilterCheckbox({name, value, checked}: FilterCheckboxProps) {
  return (
    <label className={styles.value__label}>
      <input
        type="checkbox"
        className={styles.label__input}
        name={`filter-checkbox-${name}`}
        value={value}
      />
      <span className={styles.label__text}>{name}</span>
    </label>
  )
}

export default FiltersBar
