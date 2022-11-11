// global
import React from 'react'
// styles and icons
import './MapBlock.scss';
// components
import BlockHeading from "../BlockHeading/BlockHeading";
import ISTUYandexMap from "../ISTUYandexMap/ISTUYandexMap";

function MapBlock() {
  
  return (
    <div className="map-block">
      <BlockHeading className="map-block__heading">
        Карта
      </BlockHeading>
      <ISTUYandexMap />
    </div>
  )
}

export default MapBlock
