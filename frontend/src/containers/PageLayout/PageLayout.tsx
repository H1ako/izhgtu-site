// global
import React from 'react'
// recoil atoms
import {useRecoilState} from "recoil";
import {lightboxImageSrcAtom} from "../../recoilAtoms/lightboxAtom";
// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AccessibilityMenu from "../../components/AccessibilityMenu/AccessibilityMenu";
import Lightbox from "../../components/Lightbox/Lightbox";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
// styles and icons
import './PageLayout.scss';

interface PageLayoutProps {
    children: React.ReactNode
}

function PageLayout({ children }: PageLayoutProps) {
  const [ lightboxImageSrc, setLightboxImageSrc ] = useRecoilState(lightboxImageSrcAtom)

  const closeLightbox = () => {
    setLightboxImageSrc('')
  }
  
  return (
    <div className="page">
      <Header />
      {children}
      <Footer />
      {/* fixed elements */}
      <AccessibilityMenu />
      <LoadingScreen />
      { lightboxImageSrc &&
        <Lightbox imageSrc={lightboxImageSrc} onClose={closeLightbox} />
      }
    </div>
  )
}

export default PageLayout
