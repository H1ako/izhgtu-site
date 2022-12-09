// global
import React from 'react'
// styles and icons
import styles from '../../styles/components/ISTUYandexMap.module.scss';
import {useRecoilValue} from "recoil";
import {settingsAtom} from "../../recoilAtoms/settingsAtom";

interface ISTUYandexMapProps {
  className?: string
}

function ISTUYandexMap({className=''}: ISTUYandexMapProps) {
  const {mainContent} = useRecoilValue(settingsAtom)
  
  return (
    <iframe
      title='Яндекс Карта ИжГТУ'
      className={`${styles.istuYandexMap} ${className}`}
      src={mainContent?.yandexMapUrl ?? ''}
    />
  )
}

export default ISTUYandexMap
