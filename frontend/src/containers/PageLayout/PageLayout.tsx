// global
import React from 'react'
// recoil atoms
import {useRecoilState} from "recoil";
import {lightboxImageSrcAtom} from "../../recoilAtoms/lightboxAtom";
// styles and icons
import './PageLayout.scss';
// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AccessibilityMenu from "../../components/AccessibilityMenu/AccessibilityMenu";
import Lightbox from "../../components/Lightbox/Lightbox";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

interface Props {
    children: React.ReactNode
}

function PageLayout({ children }: Props) {
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
