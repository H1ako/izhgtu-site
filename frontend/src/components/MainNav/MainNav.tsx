// global
import React from 'react'
// styles and icons
import './MainNav.scss';
// components
import {Link} from "react-router-dom";
import LinkGroup from "../LinkGroup/LinkGroup";
import links from '../../links.json'

function MainNav() {
  return (
    <nav className="main-nav">
      <ul className="main-nav__link-groups">
        { links.map(linkGroup => (
          <LinkGroup key={linkGroup.name} name={linkGroup.name} links={linkGroup.links} />
        ))}
      </ul>
    </nav>
  )
}

export default MainNav
