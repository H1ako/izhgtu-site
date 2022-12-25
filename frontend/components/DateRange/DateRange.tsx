// global
import React from 'react'
import ReactDatePicker from "react-datepicker";
// components
// styles
import styles from './DateRange.module.scss'


type DateType = Date | null

interface DateRangeProps {
  className?: string,
  startDate: DateType,
  endDate: DateType,
  setStartDate: (date: DateType) => void,
  setEndDate: (date: DateType) => void,
  startDateId?: string,
  endDateId?: string,
  onChange?: () => void,
}


function DateRange({startDate, endDate, setStartDate, setEndDate, className='', startDateId, endDateId, onChange}: DateRangeProps) {
  const dateChangeHandler = (date: DateType, setDate: (date: DateType) => void) => {
    setDate(date)
    
    onChange && onChange()
  }
  
  return (
    <div className={`${styles.dateRange} ${className}`}>
      <ReactDatePicker
        className={styles.dateRange__datePicker}
        selected={startDate}
        onChange={date => dateChangeHandler(date, setStartDate)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        id={startDateId}
      />
      <ReactDatePicker
        selected={endDate}
        className={styles.dateRange__datePicker}
        onChange={date => dateChangeHandler(date, setEndDate)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        id={endDateId}
      />
    </div>
  )
}

export default DateRange