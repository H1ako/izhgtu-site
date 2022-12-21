// global
import React from 'react'
// styles and icons
import styles from './PostCardLayout.module.scss';


export interface PostCardProps {
  title: string,
  picture?: string,
  date?: string,
  infoClassName?: string,
  className?: string,
}

interface PostCardLayoutProps extends PostCardProps {
  children?: React.ReactNode,
}


function PostCardLayout({ title, picture='', date='', className='', infoClassName='', children }: PostCardLayoutProps) {
  return (
    <li className={`${styles.postCardLayout} ${className}`}>
      {children}
      <img src={picture} alt="" />
      <div className={`${styles.postCardLayout__info} ${infoClassName}`}>
        <time className={styles.info__date}>{date}</time>
        <h3 className={styles.info__heading}>{title}</h3>
      </div>
    </li>
  )
}

export default PostCardLayout
