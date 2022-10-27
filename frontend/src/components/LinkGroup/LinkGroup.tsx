// global
import React from 'react'
// styles and icons
import './LinkGroup.scss';
// components
import {Link} from "react-router-dom";

function LinkGroup({id, name, links}: LinkCategory) {
  const [ hoveredLink, setHoveredLink ] = React.useState<any | LinkCategory>(null)
  
  return (
    <li id={`link-group-${id}`} className="link-group">
      <button className="group__toggle">{name}</button>
      <div className="group__links-window">
        <ul className="links-window__links">
          { links.map(link => (
            <li
              key={`link-${link.id}`}
              onMouseEnter={() => setHoveredLink(link)}
              className={`links__link ${hoveredLink?.name === link.name && 'active'}`}
            >
              <Link to={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <div className="links-window__link-info">
          <h2 className="link-info__name">{hoveredLink?.name ?? ''}</h2>
          <p className="link-info__description">{hoveredLink?.description ?? ''}</p>
        </div>
      </div>
    </li>
  )
}

export default LinkGroup
