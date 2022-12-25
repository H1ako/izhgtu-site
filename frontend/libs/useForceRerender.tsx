import { useState } from "react";


interface UseForceRerender {
  forceRerender: () => void,
  value: number
}


export default function useForceRerender(): UseForceRerender {
  const [value, setValue] = useState(0)
  
  const forceRerender = () => {
    setValue(currentValue => currentValue + 1)
  }
  
  return {
    value,
    forceRerender
  }
}