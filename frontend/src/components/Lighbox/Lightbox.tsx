// global
import React from 'react'
// styles and icons
import './Lightbox.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotate} from "@fortawesome/free-solid-svg-icons";
// components
import ModalAreaLayout from "../../containers/ModalAreaLayout/ModalAreaLayout";

interface Props {
  imageSrc: string,
  onClose: () => void
}

function Lightbox({imageSrc, onClose}: Props) {
  const [ rotateCounter, setRotateCounter ] = React.useState<number>(1)
  const imageRef = React.useRef<HTMLImageElement>(null)
  
  const getRotateIndex = (): number => {
    // need index up to 4 numbers to rotate by 90deg
    return rotateCounter % 4
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
