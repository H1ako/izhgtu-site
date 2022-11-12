// global
import React from 'react'
// components
import ModalAreaLayout from "../../containers/ModalAreaLayout/ModalAreaLayout";
// styles and icons
import './Lightbox.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotate} from "@fortawesome/free-solid-svg-icons";

interface LightboxProps {
  imageSrc: string,
  onClose: () => void
}

function Lightbox({imageSrc, onClose}: LightboxProps) {
  const [ rotateCounter, setRotateCounter ] = React.useState<number>(1)
  const imageRef = React.useRef<HTMLImageElement>(null)
  
  const getRotateIndex = (): number => {
    const DEGREES_INDEX = 4
    
    return rotateCounter % DEGREES_INDEX
  }
  
  const rotateImage = (): void => {
    if (!imageRef.current) return
    
    setRotateCounter(state => state + 1)
    
    const rotateIndex = String(getRotateIndex())
    imageRef.current.style.setProperty('--rotateIndex', rotateIndex)
  }
  
  return (
    <ModalAreaLayout className="lightbox" onClose={onClose}>
      <div className="lightbox__control">
        <button className="control__btn control__rotate" onClick={rotateImage}>
          <FontAwesomeIcon icon={faRotate} />
        </button>
      </div>
      <img ref={imageRef} src={imageSrc} alt="" className="lightbox__image"/>
    </ModalAreaLayout>
  )
}

export default Lightbox
