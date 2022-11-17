// global
import React from 'react'
// recoil
import {useRecoilState, useSetRecoilState} from "recoil";
import {searchWindowStateAtom} from "../../recoilAtoms/searchAtom";
// styles and icons
import '../../styles/components/MainActionBtns.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faMagnifyingGlass, faPhone} from "@fortawesome/free-solid-svg-icons";

interface MainActionBtnsProps {
  className?: string
}

function MainActionBtns({className=''}: MainActionBtnsProps) {
  const setSearchState = useSetRecoilState(searchWindowStateAtom)
  
  const openSearch = () => {
    setSearchState(true)
  }
  
  return (
    <div className={`main-action-btns ${className}`}>
      <button className="main-action-btns__btn" onClick={openSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="btn__icon" />
      </button>
      <button className="main-action-btns__btn">
        <FontAwesomeIcon icon={faPhone} className="btn__icon" />
      </button>
      <button className="main-action-btns__btn">
        <FontAwesomeIcon icon={faLocationDot} className="btn__icon" />
      </button>
    </div>
  )
}

export default MainActionBtns
