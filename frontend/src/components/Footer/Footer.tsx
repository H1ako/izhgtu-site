// global
import React from 'react'
// components
import ISTUYandexMap from "../ISTUYandexMap/ISTUYandexMap";
// styles and icons
import './Footer.scss';

function Footer() {
  return (
      <footer className="main-footer">
        <ISTUYandexMap className="main-footer__map" />
      </footer>
  )
}

export default Footer
