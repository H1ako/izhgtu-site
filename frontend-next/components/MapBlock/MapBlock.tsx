// global
import React from 'react'
// components
import BlockHeading from "../BlockHeading/BlockHeading";
import ISTUYandexMap from "../ISTUYandexMap/ISTUYandexMap";
// styles and icons
import '../../styles/components/MapBlock.module.scss';

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
