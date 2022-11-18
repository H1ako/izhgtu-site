// global
import React from 'react'
// styles and icons
import styles from '../../styles/components/Profile.module.scss';
import WindowWithHeaderLayout from "../../containers/WindowWithHeaderLayout/WindowWithHeaderLayout";

interface ProfileProps {
  className?: string
}

function Profile({className=''}: ProfileProps) {
  return (
    <WindowWithHeaderLayout heading="Профиль" className={`${styles.profile} ${className}`} ToggleButton={
      <button className={styles.profile__toggle}>
        <img className={styles.toggle__userPicture} src="/assets/ava.png" alt=""/>
      </button>
    }>
      a
    </WindowWithHeaderLayout>
  )
}

export default Profile
