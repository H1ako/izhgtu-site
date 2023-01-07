// global
import React from 'react'
import {Collapse} from "react-collapse";
// components
import SearchField from "../SearchField/SearchField";
import DateRange from "../DateRange/DateRange";
import CheckboxWithText from "../CheckboxWithText/CheckboxWithText";
// libs
import useForceRerender from "../../libs/useForceRerender";
// styles
import styles from './FiltersBar.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";


type ChosenFilterDateType = [
  string,
  string,
] | []

type ChosenFilterCheckboxType = string[]

export type ChosenFiltersType = {
  [key: string]: ChosenFilterCheckboxType | ChosenFilterDateType | null
}

enum FilterTypeType {
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
}

interface FiltersBarProps {
  className?: string,
  filters: (FilterDateType | FilterCheckboxType)[],
  onFilterStateChange: (filters: ChosenFiltersType) => void
}

interface FilterProps {
  filterName: string,
  filterSlug: string,
  filterType: FilterTypeType,
  filterValues: FilterValueType[],
  onFilterValueStateChange?: () => void
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
      if (filter.type === FilterTypeType.CHECKBOX) {
        const filterCheckedValues = getFilterCheckedValuesBySlug(filter.slug)
        
        chosenFilters[filter.slug] = filterCheckedValues.length ? filterCheckedValues : null
      }
      else if (filter.type === FilterTypeType.DATE) {
        const filterDateValues = getFilterDateValuesBySlug(filter.slug)
        
        chosenFilters[filter.slug] = filterDateValues.length ? filterDateValues : null
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
          <Filter
            key={filter.slug}
            filterName={filter.name}
            filterSlug={filter.slug}
            filterType={filter.type}
            filterValues={filter.values}
            onFilterValueStateChange={forceRerender}
          />
        )) }
      </ul>
    </aside>
  )
}


function Filter({filterName, filterSlug, filterType, filterValues, onFilterValueStateChange}: FilterProps) {
  const [ isFilterOpen, setIsFilterOpen ] = React.useState(true)
  
  const toggleFilter = () => {
    setIsFilterOpen(value => !value)
  }
  
  return (
    <li key={`filter-${filterName}`} className={styles.filters__filter}>
      <div className={styles.filter__header}>
        <h2 className={styles.header__heading}>{filterName}</h2>
        <button className={styles.header__toggle} onClick={toggleFilter}>
          <FontAwesomeIcon icon={isFilterOpen ? faChevronUp : faChevronDown} />
        </button>
      </div>
      <Collapse theme={{collapse: styles.filter__valuesWrapper}} isOpened={isFilterOpen}>
        <FilterValues
          values={filterValues}
          filterName={filterName}
          filterType={filterType}
          filterSlug={filterSlug}
          onFilterValueStateChange={onFilterValueStateChange}
        />
      </Collapse>
    </li>
  )
}


function FilterValues({values, filterName, filterType, filterSlug, onFilterValueStateChange}: FilterValuesProps) {
  const [ startDate, setStartDate ] = React.useState<Date | null>(null)
  const [ endDate, setEndDate ] = React.useState<Date | null>(null)
  
  if (filterType === FilterTypeType.CHECKBOX) {
    return (
      <ul id={`filter-values-${filterSlug}`} className={styles.valuesWrapper__values}>
        { values.map(value => (
          <li key={`filter-${filterName}-value-${value.name}`} className={styles.values__value}>
            <CheckboxWithText
              name={`filter-checkbox-${value.name}`}
              value={value.value}
              text={value.name}
              onChange={onFilterValueStateChange}
            />
          </li>
        )) }
      </ul>
    )
  }
  else if (filterType === FilterTypeType.DATE) {
    return (
      <DateRange
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        className={styles.valuesWrapper__dateRange}
        startDateId={`filter-date-start-${filterSlug}`}
        endDateId={`filter-date-end-${filterSlug}`}
        onChange={onFilterValueStateChange}
      />
    )
  }
  return (
    <>Wrong Type</>
  )
}


function FilterDate({startDate, endDate, setStartDate, setEndDate, filterSlug, onChange}: FilterDateProps) {
  return (
    <DateRange
      startDate={startDate}
      endDate={endDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      className={styles.valuesWrapper__dateRange}
      startDateId={`filter-date-start-${filterSlug}`}
      endDateId={`filter-date-end-${filterSlug}`}
      onChange={onChange}
    />
  )
}


export default FiltersBar
