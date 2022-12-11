// global
import React from 'react'
// components
import InnerBlockHeading from "../InnerBlockHeading/InnerBlockHeading";
// styles and icons
import styles from './UserMiniCard.module.scss';


interface UserMiniCardProps {
  userName: string,
  userPicture?: string | null,
  userOccupation?: string | null,
  className?: string,
}


function UserMiniCard({userName, userPicture, userOccupation, className=''}: UserMiniCardProps) {
  return (
    <div className={styles.userMiniCard}>
      { userPicture &&
        <img src={userPicture} alt="" className={styles.userMiniCard__picture}/>
      }
      <div className={styles.userMiniCard__info}>
        <h3 className={styles.info__name}>{userName}</h3>
        { userOccupation &&
          <h4 className={styles.info__occupation}>{userOccupation}</h4>
        }
      </div>
    </div>
  )
}

export default UserMiniCard
