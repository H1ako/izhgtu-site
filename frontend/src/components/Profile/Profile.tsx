// global
import React from 'react'
// styles and icons
import './Profile.scss';
// components

interface ProfileProps {
  className?: string
}

function Profile({className}: ProfileProps) {
  return (
      <div className={`profile ${className}}`}>
        <button className="profile__toggle">
          <img className="toggle__user-picture" src="/assets/ava.png" alt=""/>
        </button>
        <div className="profile__content"></div>
      </div>
  )
}

export default Profile
