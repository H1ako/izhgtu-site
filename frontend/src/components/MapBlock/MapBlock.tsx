// global
import React from 'react'
// styles and icons
import './MapBlock.scss';
import BlockHeading from "../BlockHeading/BlockHeading";
// components

function MapBlock() {
  const [ currentMapIndex, setCurrentMapIndex ] = React.useState<number>(0)
  const [ currentIstuMapIndex, setCurrentIstuMapIndex ] = React.useState<number>(0)
  
  return (
    <div className="map-block">
      <BlockHeading>
        Карта
      </BlockHeading>
      <ul className="map-block__map-types">
        <li className="map-types__type">
          <button onClick={() => setCurrentMapIndex(0)}>Карта Яндекс</button>
        </li>
        <li className="map-types__type">
          <button onClick={() => setCurrentMapIndex(1)}>Карта от ИжГТУ</button>
        </li>
      </ul>
      <div className={`map-block__istu-map  ${currentMapIndex === 0 && 'active'}`}>
        <ul className="istu-map__map-types">
          <li className="map-types__type">
            <button onClick={() => setCurrentIstuMapIndex(0)}>Общее</button>
          </li>
          <li className="map-types__type">
            <button onClick={() => setCurrentIstuMapIndex(0)}>Общее</button>
          </li>
          <li className="map-types__type">
            <button onClick={() => setCurrentIstuMapIndex(0)}>Общее</button>
          </li>
          <li className="map-types__type">
            <button onClick={() => setCurrentIstuMapIndex(0)}>Общее</button>
          </li>
        </ul>
      </div>
      <iframe
        className={`map-block__yandex-map ${currentMapIndex === 1 && 'active'}`}
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b18e751e56a86d982749b9809b82924588e14b35be6a6b3e6c4302b54112aa9&amp;source=constructor"
        width="676" height="473">
      </iframe>
      <div className="map-block__istu-maps">
      
      </div>
    </div>
  )
}

export default MapBlock
