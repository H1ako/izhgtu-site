// global
import React from 'react'
// styles and icons
import './MapBlock.scss';
import BlockHeading from "../BlockHeading/BlockHeading";
import Switcher from "../Switcher/Switcher";
// components

function MapBlock() {
  const [ currentMapIndex, setCurrentMapIndex ] = React.useState<number>(0)
  const [ currentIstuMapIndex, setCurrentIstuMapIndex ] = React.useState<number>(0)
  
  return (
    <div className="map-block">
      <BlockHeading>
        Карта
      </BlockHeading>
      <Switcher className="map-block__map-types" index={currentMapIndex} setIndex={setCurrentMapIndex}>
        <button>Карта Яндекс</button>
        <button>Карта от ИжГТУ</button>
      </Switcher>
      <iframe
        title="yandex-map"
        className={`map-block__yandex-map ${currentMapIndex === 0 && 'active'}`}
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b18e751e56a86d982749b9809b82924588e14b35be6a6b3e6c4302b54112aa9&amp;source=constructor"
        width="676" height="473">
      </iframe>
      <div className={`map-block__istu-map  ${currentMapIndex === 1 && 'active'}`}>
        <Switcher className='istu-map__map-types' index={currentIstuMapIndex} setIndex={setCurrentIstuMapIndex}>
          <button>Общее</button>
          <button>Соц объекты</button>
          <button>Факультеты</button>
          <button>Транспорт</button>
        </Switcher>
        <ul className="istu-map__maps">
          <li className={`maps__map ${currentIstuMapIndex == 0 && 'active'}`}>
            <img src="/assets/istu_maps/map_common.jpg" alt=""/>
          </li>
          <li className={`maps__map ${currentIstuMapIndex == 1 && 'active'}`}>
            <img src="/assets/istu_maps/map_social.jpg" alt=""/>
          </li>
          <li className={`maps__map ${currentIstuMapIndex == 2 && 'active'}`}>
            <img src="/assets/istu_maps/map_faculties.jpg" alt=""/>
          </li>
          <li className={`maps__map ${currentIstuMapIndex == 3 && 'active'}`}>
            <img src="/assets/istu_maps/map_transport.jpg" alt=""/>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MapBlock
