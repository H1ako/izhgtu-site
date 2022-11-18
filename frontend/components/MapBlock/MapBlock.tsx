// global
import React from 'react'
// components
import BlockHeading from "../BlockHeading/BlockHeading";
import ISTUYandexMap from "../ISTUYandexMap/ISTUYandexMap";
// styles and icons
import styles from '../../styles/components/MapBlock.module.scss';

function MapBlock() {
  return (
    <div className={styles.mapBlock}>
      <BlockHeading>
        Карта
      </BlockHeading>
      <ISTUYandexMap />
    </div>
  )
}

export default MapBlock
