// global
import React from 'react'
// recoil
import {useRecoilState, useSetRecoilState} from "recoil";
import {searchWindowStateAtom} from "../../recoilAtoms/searchAtom";
// styles and icons
import styles from '../../styles/components/MainActionBtns.module.scss';
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
    <div className={`${styles.mainActionBtns} ${className}`}>
      <button className={styles.mainActionBtns__btn} onClick={openSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <button className={styles.mainActionBtns__btn}>
        <FontAwesomeIcon icon={faPhone} />
      </button>
      <button className={styles.mainActionBtns__btn}>
        <FontAwesomeIcon icon={faLocationDot} />
      </button>
    </div>
  )
}

export default MainActionBtns
