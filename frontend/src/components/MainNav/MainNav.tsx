// global
import React from 'react'
// styles and icons
import './MainNav.scss';
// components
import {Link} from "react-router-dom";

function MainNav() {
  return (
    <nav className="main-nav">
      <ul className="main-nav__link-groups">
        <li id="university" className="link-groups__group">
          <button className="group__toggle">Университет</button>
          <div className="group__links-window">
            <ul className="links-window__links">
              <li className="links__link">
                <Link to="/">goasdasda</Link>
              </li>
              <div className="links-window__link-info">
                <div className="link-info__name"></div>
              </div>
            </ul>
          </div>
        </li>
        <li id="students" className="link-groups__group">
          <button className="group__toggle">О Студентах</button>
          <div className="group__links-window">
            <ul className="links-window__links">
              <li className="links__link">
                <Link to="/"></Link>
              </li>
            </ul>
          </div>
        </li>
        <li id="education" className="link-groups__group">
          <button className="group__toggle">Образование</button>
          <div className="group__links-window">
            <ul className="links-window__links">
              <li className="links__link">
                <Link to="/"></Link>
              </li>
            </ul>
          </div>
        </li>
        <li id='science' className="link-groups__group">
          <button className="group__toggle">Наука</button>
          <div className="group__links-window">
            <ul className="links-window__links">
              <li className="links__link">
                <Link to="/"></Link>
              </li>
            </ul>
          </div>
        </li>
        <li id="internationality" className="link-groups__group">
          <button className="group__toggle">Международная Деятельность</button>
          <div className="group__links-window">
            <ul className="links-window__links">
              <li className="links__link">
                <Link to="/"></Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default MainNav
