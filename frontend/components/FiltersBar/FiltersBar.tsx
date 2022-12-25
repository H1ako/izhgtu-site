// global
import React from 'react'
// components
import SearchField from "../SearchField/SearchField";
import DateRange from "../DateRange/DateRange";
// libs
import useForceRerender from "../../libs/useForceRerender";
// styles
import styles from './FiltersBar.module.scss'


type ChosenFilterDateType = [
  string,
  string,
] | []

type ChosenFilterCheckboxType = string[]

type ChosenFiltersType = {
  [key: string]: ChosenFilterCheckboxType | ChosenFilterDateType
}

enum FilterTypeType {
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
}

interface FiltersBarProps {
  className?: string,
  filters: (FilterDateType | FilterCheckboxType)[],
  onFilterStateChange: (filters: any) => void
}

interface FilterValuesProps {
  values: FilterValueType[],
  onFilterValueStateChange?: () => void,
  filterName: string,
  filterSlug: string,
  filterType: FilterTypeType,
}

interface FilterDateProps {
  filterSlug: string,
  endDate: Date | null,
  startDate: Date | null,
  setEndDate: (date: Date | null) => void,
  setStartDate: (date: Date | null) => void,
  onChange?: () => void,
}

interface FilterCheckboxProps {
  name: string,
  value: string,
  onChange?: () => void,
}

interface FilterValueType {
  name: string,
  value: string
}

interface FilterType {
  type: FilterTypeType,
  name: string,
  slug: string,
}

interface FilterCheckboxType extends FilterType {
  values: FilterValueType[]
}

interface FilterDateType extends FilterType {
  values: []
}


function FiltersBar({className='', filters, onFilterStateChange}: FiltersBarProps) {
  const [ searchValue, setSearchValue ] = React.useState('')
  const { forceRerender, value: forceRerenderValue } = useForceRerender()
  
  const getChosenFilters = () => {
    const chosenFilters: ChosenFiltersType = {}
    
    filters.forEach(filter => {
      chosenFilters[filter.slug] = []
      
      if (filter.type === FilterTypeType.CHECKBOX) {
        const filterCheckedValues = getFilterCheckedValuesBySlug(filter.slug)
        
        chosenFilters[filter.slug] = filterCheckedValues
      }
      else if (filter.type === FilterTypeType.DATE) {
        const filterDateValues = getFilterDateValuesBySlug(filter.slug)
        
        chosenFilters[filter.slug] = filterDateValues
      }
    })
    
    return chosenFilters
  }
  
  const getFilterCheckedValuesBySlug = (slug: string): ChosenFilterCheckboxType => {
    const checkboxes = document.querySelectorAll(`*[id="${`filter-values-${slug}`}"] input:checked`)
    
    return Array.from(checkboxes).map(checkbox => (checkbox as HTMLInputElement).value)
  }
  
  const getFilterDateValuesBySlug = (slug: string): ChosenFilterDateType => {
    const startDate = document.querySelector(`*[id="${`filter-date-start-${slug}`}"]`) as HTMLInputElement
    const endDate = document.querySelector(`*[id="${`filter-date-end-${slug}`}"]`) as HTMLInputElement
    
    const dateRangeStart = startDate?.value || endDate?.value
    const dateRangeEnd = endDate?.value || startDate?.value
    
    if (dateRangeStart && dateRangeEnd) {
      return [dateRangeStart, dateRangeEnd]
    }
    
    return []
  }
  
  React.useEffect(() => {
    onFilterStateChange(getChosenFilters())
  }, [forceRerenderValue])
  
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
              filterSlug={filter.slug}
              onFilterValueStateChange={forceRerender}
            />
          </li>
        )) }
      </ul>
    </aside>
  )
}


function FilterValues({values, filterName, filterType, filterSlug, onFilterValueStateChange}: FilterValuesProps) {
  if (filterType === FilterTypeType.CHECKBOX) {
    return (
      <ul id={`filter-values-${filterSlug}`} className={styles.filter__values}>
        { values.map(value => (
          <li key={`filter-${filterName}-value-${value.name}`} className={styles.values__value}>
            <FilterCheckbox
              name={value.name}
              value={value.value}
              onChange={onFilterValueStateChange}
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
        filterSlug={filterSlug}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onChange={onFilterValueStateChange}
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
              onChange={onFilterValueStateChange}
            />
            <span className={styles.label__text}>{value.name}</span>
          </label>
        </li>
      )) }
    </ul>
  )
}


function FilterDate({startDate, endDate, setStartDate, setEndDate, filterSlug, onChange}: FilterDateProps) {
  return (
    <DateRange
      startDate={startDate}
      endDate={endDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      className={styles.value__dateRange}
      startDateId={`filter-date-start-${filterSlug}`}
      endDateId={`filter-date-end-${filterSlug}`}
      onChange={onChange}
    />
  )
}


function FilterCheckbox({name, value, onChange}: FilterCheckboxProps) {
  return (
    <label className={styles.value__label}>
      <input
        type="checkbox"
        className={styles.label__input}
        name={`filter-checkbox-${name}`}
        value={value}
        onChange={onChange}
      />
      <span className={styles.label__text}>{name}</span>
    </label>
  )
}

export default FiltersBar
