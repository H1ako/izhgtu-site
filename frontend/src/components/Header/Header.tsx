// global
import React from 'react'
// styles and icons
import './Header.scss';
// components
import MiniProfile from "../MiniProfile/MiniProfile";
import Search from "../Search/Search";
import DayInfo from "../DayInfo/DayInfo";

// TODO: make skip header button
function Header() {
  return (
      <header>
          <div className="header__content">
              <DayInfo />
              <Search />
              <MiniProfile />
          </div>
      </header>
  )
}

export default Header
