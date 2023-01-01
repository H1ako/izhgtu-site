// global
import React from 'react'
// styles and icons
import styles from './LocationList.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";


interface Location {
  __typename?: "Location",
  id: number,
  description?: string | null,
  address: string,
  name: string,
}
interface LocationListProps {
  className?: string,
  locations: Location[]
}

function LocationList({locations, className=''}: LocationListProps) {
  return (
    <ul className={`${styles.locationList} ${className}`}>
      { locations.map((location) => (
        <li key={`location-${location.id}`} className={styles.locationList__location}>
          <a href={``} className={styles.location__text}>
            {location.address}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default LocationList
