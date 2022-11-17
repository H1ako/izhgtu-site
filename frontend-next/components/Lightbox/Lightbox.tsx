// global
import React from 'react'
// recoil
import {useRecoilState} from "recoil";
import {lightboxImageSrcAtom} from "../../recoilAtoms/lightboxAtom";
// components
import ModalAreaLayout from "../../containers/ModalAreaLayout/ModalAreaLayout";
// styles and icons
import '../../styles/components/Lightbox.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotate} from "@fortawesome/free-solid-svg-icons";

function Lightbox() {
  const [ lightboxImageSrc, setLightboxImageSrc ] = useRecoilState(lightboxImageSrcAtom)
  const [ rotateCounter, setRotateCounter ] = React.useState<number>(0)
  const imageRef = React.useRef<HTMLImageElement>(null)
  
  const rotateImage = (): void => {
    setRotateCounter(state => state + 1)
  }
  
  const updateRotateCounter = (): void => {
    if (!imageRef.current) return
    const rotateIndex = String(getRotateIndex())
    
    imageRef.current.style.setProperty('--rotateIndex', rotateIndex)
  }
  
  const getRotateIndex = (): number => {
    const DEGREES_INDEX = 4
    
    return rotateCounter % DEGREES_INDEX
  }
  
  const updateRotation = () => {
    setRotateCounter(0)
  }
  
  const closeLightbox = (): void => {
    setLightboxImageSrc('')
  }
  
  React.useEffect(() => {
    updateRotation()
  }, [lightboxImageSrc])
  
  React.useEffect(() => {
    updateRotateCounter()
  }, [rotateCounter])
  
  return (
    <ModalAreaLayout isActive={!!lightboxImageSrc.length} className="lightbox" onClose={closeLightbox}>
      <div className="lightbox__control">
        <button className="control__btn control__rotate" onClick={rotateImage}>
          <FontAwesomeIcon icon={faRotate} />
        </button>
      </div>
      <img ref={imageRef} src={lightboxImageSrc} alt="" className="lightbox__image"/>
    </ModalAreaLayout>
  )
}

export default Lightbox
