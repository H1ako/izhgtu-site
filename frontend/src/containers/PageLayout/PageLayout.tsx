// global
import React from 'react'
// styles and icons
import './PageLayout.scss';
// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

interface Props {
    children: React.ReactNode
}

function PageLayout({ children }: Props) {
  return (
      <>
          <Header />
          {children}
          <Footer />
      </>
  )
}

export default PageLayout
