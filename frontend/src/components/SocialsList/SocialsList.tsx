// global
import React from 'react'
import {Link} from "react-router-dom";
// styles and icons
import './SocialsList.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTelegram, faVk, faYoutube} from "@fortawesome/free-brands-svg-icons"

interface SocialsListProps {
  className?: string
}

function SocialsList({className=''}: SocialsListProps) {
  return (
    <ul className={`socials-list ${className}`}>
      <li className="socials-list__part">
        <Link to='/' className='part__text'>
          <FontAwesomeIcon icon={faVk} className="text__icon" />
        </Link>
      </li>
      <li className="socials-list__part">
        <Link to='/' className='part__text'>
          <FontAwesomeIcon icon={faYoutube} className="text__icon" />
        </Link>
      </li>
      <li className="socials-list__part">
        <Link to='/' className='part__text'>
          <FontAwesomeIcon icon={faTelegram} className="text__icon" />
        </Link>
      </li>
    </ul>
  )
}

export default SocialsList
