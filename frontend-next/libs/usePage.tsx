// global
import React from 'react'
import {useLocation} from "react-router-dom";
// recoil
import {useSetRecoilState} from "recoil";
import {loadingScreenAtom} from "../recoilAtoms/loadingAtom";

export const usePage = () => {
  const location = useLocation()
  const [ pageData, setPageData ] = React.useState<any | null>(null)
  const setIsLoading = useSetRecoilState(loadingScreenAtom)
  
  React.useEffect(() => {
    updatePageData()
  }, [location])
  
  const updatePageData = async (): Promise<void> => {
    setIsLoading(true)
    const newPageData = await getPageData()
    
    await setPageData(newPageData)
    setIsLoading(false)
  }
  
  const getPageData = () => {
  
  }
  
  return pageData
}