// global
import React from 'react'
// styles and icons
import styles from './PictureUpload.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

interface PictureUploadProps {
  className?: string,
  contentClassName?: string,
  imageClassName?: string,
  defaultPictureUrl?: string | null,
  picture: UploadPictureType,
  setPicture: React.Dispatch<React.SetStateAction<UploadPictureType>>,
  title?: string,
}

export type UploadPictureType = File | null | 'DELETED'

function PictureUpload(
  {setPicture, picture, defaultPictureUrl, className, contentClassName, imageClassName, title}: PictureUploadProps) {
  const id = React.useId()
  const [ pictureUrl, setPictureUrl ] = React.useState<string | null>(null)

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || files.length <= 0) return
    
    const picture = files[0]
    const pictureUrl = URL.createObjectURL(picture)
    
    setPicture(picture)
    setPictureUrl(pictureUrl)
  }
  
  const removePicture = () => {
    setPicture('DELETED')
    setPictureUrl(null)
  }
  
  React.useLayoutEffect(() => {
    if (!defaultPictureUrl || picture) return
    
    setPictureUrl(defaultPictureUrl)
  }, [defaultPictureUrl])

  return (
    <div className={`${styles.pictureUpload} ${className}`}>
      <div className={`${styles.pictureUpload__innerContent} ${contentClassName}`}>
        <label htmlFor={`uploadPicture-${id}`} className={styles.innerContent__uploadBtn}>
          <FontAwesomeIcon icon={faDownload} className={styles.uploadBtn__icon}/>
          <span className={styles.uploadBtn__text}>Загрузить фото</span>
        </label>
        { (picture || pictureUrl) &&
          <button onClick={removePicture} className={styles.innerContent__removeBtn}>Удалить</button>
        }
      </div>
      <input id={`uploadPicture-${id}`} type="file" onChange={handlePictureChange} className={styles.pictureUpload__input} />
      <img className={`${styles.pictureUpload__picture} ${imageClassName}`} src={pictureUrl ?? ''} alt={''} />
      { title &&
        <h2 className={styles.pictureUpload__title}>{title}</h2>
      }
    </div>
  )
}

export default PictureUpload