// global
import React from 'react'
import {useRecoilValue} from "recoil";
// components
import WindowWithHeaderLayout from "../../containers/WindowWithHeaderLayout/WindowWithHeaderLayout";
// recoil
import {authUserAtom} from "../../recoilAtoms/authUserrAtom";
// styles and icons
import styles from '../../styles/components/Profile.module.scss';

interface ProfileProps {
  className?: string
}

function Profile({className=''}: ProfileProps) {
  const authUser = useRecoilValue(authUserAtom)
  
  return (
    <WindowWithHeaderLayout heading="Профиль" className={`${styles.profile} ${className}`} ToggleButton={
      <button className={styles.profile__toggle}>
        <img className={styles.toggle__userPicture} src={authUser?.pictureUrl ?? ''} alt={authUser?.fullName}/>
      </button>
    }>
      a
    </WindowWithHeaderLayout>
  )
}

export default Profile
