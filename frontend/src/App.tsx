import React, {lazy} from 'react';
import { Route, Routes } from "react-router-dom";
import {useRecoilState} from "recoil";
import {loadingScreenAtom} from "./recoilAtoms/loadingAtom";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"))

function App() {
  const [ isLoading, setIsLoading ] = useRecoilState(loadingScreenAtom)
  
  setTimeout(() => {
    setIsLoading(false)
  }, 500)
  
  
  return (
      <Routes>
        {/*<Route path='/' element={<HomePage />} />*/}
      </Routes>
  );
}

export default App;
