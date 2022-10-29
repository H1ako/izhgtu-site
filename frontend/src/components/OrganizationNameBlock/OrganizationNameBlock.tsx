// global
import React from 'react'
// styles and icons
import './OrganizationNameBlock.scss';
// components
import AppLogo from "../AppLogo/AppLogo";

function OrganizationNameBlock() {
  return (
    <div className="organization-name-block">
      <div className="organization-name-block__content">
        <AppLogo className="content__logo" />
        <span className="content__organization">
          <h4 className="organization__type">
            Федеральное государственное бюджетное образовательное учреждение высшего образования
          </h4>
          <h5 className="organization__type-short">Федеральное государственное бюджетное образовательное учреждение высшего образования</h5>
          <h2 className="organization__name">
            Ижевский государственный технический университет имени М.Т. Калашникова
          </h2>
          <h2 className="organization__name-short">
            ИжГТУ имени М.Т. Калашникова
          </h2>
        </span>
      </div>
    </div>
  )
}

export default OrganizationNameBlock
