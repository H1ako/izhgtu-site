// global
import React from 'react'
// styles and icons
import './Header.scss';
// components
import AppLogo from "../AppLogo/AppLogo";
import Menu from "../Menu/Menu";
import Profile from "../Profile/Profile";
import {Link} from "react-router-dom";

// TODO: make skip header button
function Header() {
  return (
      <header>
          <div className="header__content">
            <Menu className="content__menu" />
            <Link to='/' className="content__logo">
              <AppLogo />
            </Link>
            <Profile className="content__profile" />
          </div>
      </header>
  )
}

export default Header
