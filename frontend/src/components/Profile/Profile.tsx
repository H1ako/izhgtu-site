// global
import React from 'react'
// styles and icons
import './Profile.scss';
import WindowWithHeaderLayout from "../../containers/WindowWithHeaderLayout/WindowWithHeaderLayout";
// components

interface ProfileProps {
  className?: string
}

function Profile({className}: ProfileProps) {
  return (
    <WindowWithHeaderLayout heading="Профиль" className={`profile ${className}`} ToggleButton={
      <button className="profile__toggle">
        <img className="toggle__user-picture" src="/assets/ava.png" alt=""/>
      </button>
    }>
      a
    </WindowWithHeaderLayout>
  )
}

export default Profile
