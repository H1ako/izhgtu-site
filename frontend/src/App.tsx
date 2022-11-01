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
  
  const pagesComponents = {
    homePage: <HomePage />
  }
  
  const routes = [
    {
      id: 0,
      path: '/',
      component: <HomePage />
    }
  ]
  
  return (
    <Routes>
      {routes.map(route => (
        <Route path={route.path} key={`route-${route.id}`} element={route.component}></Route>
      ))}
    </Routes>
  );
}

export default App;
