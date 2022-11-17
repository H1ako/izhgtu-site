// global
import React from 'react'
// styles and icons
import '../../styles/components/OrganizationName.module.scss';

interface OrganizationNameProps {
  className?: string
}

function OrganizationName({className=''}: OrganizationNameProps) {
  return (
    <div className={`organization-name ${className}`}>
      <h2 className="organization-name__type">
        Федеральное государственное бюджетное образовательное учреждение высшего образования
      </h2>
      <h2 className="organization-name__type-short">
        ФГБОУ ВО
      </h2>
      <h1 className="organization-name__name">
        Ижевский государственный технический университет имени М.Т. Калашникова
      </h1>
      <h2 className="organization-name__name-short">
        ИжГТУ имени М.Т. Калашникова
      </h2>
    </div>
  )
}

export default OrganizationName
