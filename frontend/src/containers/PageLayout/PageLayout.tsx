// global
import React from 'react'
// styles and icons
import './PageLayout.scss';
// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AccessibilityMenu from "../../components/AccessibilityMenu/AccessibilityMenu";

interface Props {
    children: React.ReactNode
}

function PageLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <AccessibilityMenu />
      <Footer />
    </>
  )
}

export default PageLayout
