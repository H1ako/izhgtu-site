// global
import React from 'react'
// styles and icons
import './MapBlock.scss';
// components
import BlockHeading from "../BlockHeading/BlockHeading";

function MapBlock() {
  
  return (
    <div className="map-block">
      <BlockHeading className="map-block__heading">
        Карта
      </BlockHeading>
      <iframe
        title="yandex-map"
        className='map-block__yandex-map'
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b18e751e56a86d982749b9809b82924588e14b35be6a6b3e6c4302b54112aa9&amp;source=constructor"
        width="676" height="473">
      </iframe>
    </div>
  )
}

export default MapBlock
