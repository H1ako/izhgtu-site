// global
import React from 'react'
// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AccessibilityMenu from "../../components/AccessibilityMenu/AccessibilityMenu";
import Lightbox from "../../components/Lightbox/Lightbox";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import SearchWindow from "../../components/SearchWindow/SearchWindow";
// styles and icons
import './PageLayout.scss';

interface PageLayoutProps {
    children: React.ReactNode
}

function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="page">
      <Header />
      {children}
      <Footer />
      {/* fixed elements */}
      <SearchWindow />
      <AccessibilityMenu />
      <LoadingScreen />
      <Lightbox />
    </div>
  )
}

export default PageLayout
