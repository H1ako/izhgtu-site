import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import {useRecoilState} from "recoil";
import {loadingScreenAtom} from "./recoilAtoms/loadingAtom";

function App() {
  const [ isLoading, setIsLoading ] = useRecoilState(loadingScreenAtom)
  
  setTimeout(() => {
    setIsLoading(false)
  }, 500)
  
  
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  );
}

export default App;
