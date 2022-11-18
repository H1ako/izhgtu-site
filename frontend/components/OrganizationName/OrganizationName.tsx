// global
import React from 'react'
// styles and icons
import styles from '../../styles/components/OrganizationName.module.scss';

interface OrganizationNameProps {
  className?: string
}

function OrganizationName({className=''}: OrganizationNameProps) {
  return (
    <div className={`${styles.organizationName} ${className}`}>
      <h2 className={styles.organizationName__type}>
        Федеральное государственное бюджетное образовательное учреждение высшего образования
      </h2>
      <h2 className={styles.organizationName__typeShort}>
        ФГБОУ ВО
      </h2>
      <h1 className={styles.organizationName__name}>
        Ижевский государственный технический университет имени М.Т. Калашникова
      </h1>
      <h2 className={styles.organizationName__nameShort}>
        ИжГТУ имени М.Т. Калашникова
      </h2>
    </div>
  )
}

export default OrganizationName
