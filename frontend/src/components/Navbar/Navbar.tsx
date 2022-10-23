// global
import React from 'react'
// components
import OrganizationNameBlock from "../OrganizationNameBlock/OrganizationNameBlock";
import MainNav from "../MainNav/MainNav";

function Navbar() {
  return (
    <div className="navbar">
      <MainNav />
      <OrganizationNameBlock />
    </div>
  )
}

export default Navbar
