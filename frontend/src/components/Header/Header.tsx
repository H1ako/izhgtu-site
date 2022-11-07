// global
import React from 'react'
// styles and icons
import './Header.scss';
// components
import AppLogo from "../AppLogo/AppLogo";
import Menu from "../Menu/Menu";
import Profile from "../Profile/Profile";

// TODO: make skip header button
function Header() {
  return (
      <header>
          <div className="header__content">
            <Menu className="content__menu" />
            <AppLogo className="content__logo" />
            <Profile className="content__profile" />
          </div>
      </header>
  )
}

export default Header
