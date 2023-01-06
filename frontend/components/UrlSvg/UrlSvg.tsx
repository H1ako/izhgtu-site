// global
import React from 'react';
// styles and icons
import styles from './UrlSvg.module.scss';

interface UrlSvgProps {
  url: string,
  alt?: string
  className?: string
}

function UrlSvg({url, alt='', className=''}: UrlSvgProps) {
  const [ icon, setIcon ] = React.useState<any>()
  
  const fetchIcon = async () => {
    const response = await fetch(url, {
      credentials: 'include',
    })
    const data = await response.text()
    
    setIcon(data)
  }
  
  React.useEffect(() => {
    if (!url) return
    
    fetchIcon()
  }, [url])
  
  return (
    // <object className={`${styles.urlSvg} ${className}`} data={url} type="image/svg+xml" >
    //   <img src={url} alt={alt} />
    // </object>
    <div
      dangerouslySetInnerHTML={{__html: icon}}
      className={`${styles.urlSvg} ${className}`}
    />
  )
}

export default UrlSvg
