// global
import React from 'react'
import Link from "next/link";
// styles and icons
import styles from '../../styles/components/SocialsList.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTelegram, faVk, faYoutube} from "@fortawesome/free-brands-svg-icons"

interface SocialsListProps {
  className?: string
}

function SocialsList({className=''}: SocialsListProps) {
  return (
    <ul className={`${styles.socialsList} ${className}`}>
      <li className={styles.socialsList__part}>
        <Link href='/' className={styles.part__text}>
          <FontAwesomeIcon icon={faVk} className={styles.text__icon} />
        </Link>
      </li>
      <li className={styles.socialsList__part}>
        <Link href='/' className={styles.part__text}>
          <FontAwesomeIcon icon={faYoutube} className={styles.text__icon} />
        </Link>
      </li>
      <li className={styles.socialsList__part}>
        <Link href='/' className={styles.part__text}>
          <FontAwesomeIcon icon={faTelegram} className={styles.text__icon} />
        </Link>
      </li>
    </ul>
  )
}

export default SocialsList
