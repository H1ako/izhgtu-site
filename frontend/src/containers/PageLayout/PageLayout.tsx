// global
import React from 'react'
// recoil atoms
import {lightboxImageSrcAtom} from "../../recoilAtoms/lightboxAtom";
// styles and icons
import './PageLayout.scss';
// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AccessibilityMenu from "../../components/AccessibilityMenu/AccessibilityMenu";
import Lightbox from "../../components/Lighbox/Lightbox";
import {useRecoilState} from "recoil";

interface Props {
    children: React.ReactNode
}

function PageLayout({ children }: Props) {
  const [ lightboxImageSrc, setLightboxImageSrc ] = useRecoilState(lightboxImageSrcAtom)

  const closeLightbox = () => {
    setLightboxImageSrc('')
  }
  
  return (
    <>
      <Header />
      {children}
      <Footer />
      {/* fixed elements */}
      <AccessibilityMenu />
      { lightboxImageSrc &&
        <Lightbox imageSrc={lightboxImageSrc} onClose={closeLightbox} />
      }
    </>
  )
}

export default PageLayout
