// global
import React from 'react'
import ReactDatePicker from "react-datepicker";
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

interface DateRangeInputProps {
  header?: string
}


function DateRange({startDate, endDate, setStartDate, setEndDate, className='', startDateId, endDateId, onChange}: DateRangeProps) {
  const dateChangeHandler = (date: DateType, setDate: (date: DateType) => void) => {
    setDate(date)
    
    onChange && onChange()
  }
  
  return (
    <div className={`${styles.dateRange} ${className}`}>
      <ReactDatePicker
        // wrapperClassName={styles.dateRange__wrapper}
        enableTabLoop={false}
        className={styles.dateRange__input}
        selected={startDate}
        onChange={date => dateChangeHandler(date, setStartDate)}
        selectsStart
        startDate={startDate}
        withPortal
        endDate={endDate}
        id={startDateId}
      />
      <ReactDatePicker
        selected={endDate}
        className={styles.dateRange__input}
        onChange={date => dateChangeHandler(date, setEndDate)}
        selectsEnd
        withPortal
        startDate={startDate}
        endDate={endDate}
        id={endDateId}
      />
    </div>
  )
}

// const DateRangeInput = React.forwardRef<HTMLDivElement, DateRangeInputProps>(
//   (props, ref) => {
//   return (
//     <div ref={ref} className={styles.dateRange__picker}>
//       <p className="picker__header"></p>
//       <input className={styles.picker__input} />
//     </div>
//   )
// })


export default DateRange