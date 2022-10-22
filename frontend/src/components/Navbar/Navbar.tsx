// global
import React from 'react'
// styles and icons
import './Navbar.scss';
// components
import {Link} from "react-router-dom";
import OrganizationNameBlock from "../OrganizationNameBlock/OrganizationNameBlock";

function Navbar() {
  return (
    <div className="navbar">
      <nav className="navbar__links">
        <ul className="navbar__links__link-groups">
          <li className="link-groups__group">
            <div className="group__links-window">
              <ul className="links-window__links">
                <li className="links__link">
                  <Link to="/"></Link>
                </li>
              </ul>
            </div>
            <button className="group__toggle">Университет</button>
          </li>
          <li className="link-groups__group">
            <button className="group__toggle">О Студентах</button>
          </li>
          <li className="link-groups__group">
            <button className="group__toggle">Образование</button>
          </li>
          <li className="link-groups__group">
            <button className="group__toggle">Наука</button>
          </li>
          <li className="link-groups__group">
            <button className="group__toggle">Международность</button>
          </li>
        </ul>
      </nav>
      <OrganizationNameBlock />
    </div>
  )
}

export default Navbar
