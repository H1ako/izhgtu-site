// global
import React from 'react'
// styles and icons
import styles from './SocialList.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTelegram, faVk, faYoutube} from "@fortawesome/free-brands-svg-icons"

interface SocialListProps {
  className?: string,
  socials: Social[]
}

interface Social {
  __typename?: "Social",
  id: number,
  name: string,
  url: string,
  icon?: SocialIcon | null
}

interface SocialIcon {
  __typename?: "SvgTyped",
  url: string,
  title: string,
}

function SocialList({socials, className=''}: SocialListProps) {
  return (
    <ul className={`${styles.socialList} ${className}`}>
      { socials.map((social) => (
        <li key={`social-${social.id}`} className={styles.socialList__social}>
          <a href={social.url} target="_blank" className={styles.social__text}>
            <FontAwesomeIcon icon={faVk} className={styles.text__icon} />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialList
