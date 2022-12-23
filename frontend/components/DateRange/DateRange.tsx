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
}


function DateRange({startDate, endDate, setStartDate, setEndDate, className=''}: DateRangeProps) {
  return (
    <div className={`${styles.dateRange} ${className}`}>
      <ReactDatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <ReactDatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </div>
  )
}

export default DateRange