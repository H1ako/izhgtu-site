// global
import React from 'react'
// styles and icons
import styles from '../../styles/components/ISTUYandexMap.module.scss';

interface ISTUYandexMapProps {
  className?: string
}

function ISTUYandexMap({className=''}: ISTUYandexMapProps) {
  
  return (
    <iframe
      title='Яндекс Карта ИжГТУ'
      className={`${styles.istuYandexMap} ${className}`}
      src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b18e751e56a86d982749b9809b82924588e14b35be6a6b3e6c4302b54112aa9&amp;source=constructor"
    />
  )
}

export default ISTUYandexMap
