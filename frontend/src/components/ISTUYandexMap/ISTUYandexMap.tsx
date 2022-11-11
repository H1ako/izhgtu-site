// global
import React from 'react'
// styles and icons
import './ISTUYandexMap.scss';

function ISTUYandexMap() {
  return (
    <iframe
      title="istu-yandex-map"
      className='istu-yandex-map'
      src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b18e751e56a86d982749b9809b82924588e14b35be6a6b3e6c4302b54112aa9&amp;source=constructor"
      width="676" height="473">
    </iframe>
  )
}

export default ISTUYandexMap
