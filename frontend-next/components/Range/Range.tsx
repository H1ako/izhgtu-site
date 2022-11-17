// global
import React from 'react'
// styles and icons
import '../../styles/components/Range.module.scss';

type RangeValueType = number | string

interface RangeProps {
  value: RangeValueType,
  setValue: (newValue: number | string) => void,
  name: string,
  minValue?: number,
  maxValue?: number
}

function Range({value, setValue, name, minValue=0, maxValue=100}: RangeProps) {
  const updateValueByNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = getValueWithinRange(Number(e.target.value))
    
    // converting to string removes 0 from start when typing e.c [input: 0123 -> 123]
    setValue(String(newValue))
  }
  
  const getValueWithinRange = (value: number): number => {
    return Math.min(Math.max(value, minValue), maxValue)
  }
  
  return (
    <div className="range-container">
      <input
        className="range-container__range"
        type="range"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        min={minValue}
        max={maxValue}
        name={name}
      />
      <input
        type="number"
        className="range-container__value"
        min={minValue}
        max={maxValue}
        value={value}
        name={name}
        onChange={updateValueByNumberInput}
      />
    </div>
  )
}

export default Range
