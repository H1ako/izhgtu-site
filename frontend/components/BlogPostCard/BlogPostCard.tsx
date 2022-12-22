// global
import React from "react";
import Link from "next/link";
// components
import PostCardLayout, {PostCardProps} from "../../containers/PostCardLayout/PostCardLayout";
// styles and icons
import styles from './BlogPostCard.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart, faShare} from "@fortawesome/free-solid-svg-icons";


interface BlogPostCardProps extends PostCardProps {
  url: string
}


function BlogPostCard({className='', title, picture, date, infoClassName, url}: BlogPostCardProps) {
  return (
    <PostCardLayout
      className={`${styles.blogPostCard} ${className}`}
      infoClassName={`${styles.blogPostCard__info} ${infoClassName}`}
      title={title}
      picture={picture}
      date={date}
    >
      <Link href={url}></Link>
      <div className={styles.blogPostCard__focusedContent}>
        <div className={styles.focusedContent__btns}>
          <button className={styles.btns__btn}>
            <FontAwesomeIcon icon={faHeart} className={styles.btn__icon} />
            <p className={styles.btn__number}>
              999
            </p>
          </button>
          <button className={styles.btns__btn}>
            <FontAwesomeIcon icon={faComment} className={styles.btn__icon} />
            <p className={styles.btn__number}>
              999
            </p>
          </button>
          <button className={styles.btns__btn}>
            <FontAwesomeIcon icon={faShare} className={styles.btn__icon} />
            <p className={styles.btn__number}>
              999
            </p>
          </button>
        </div>
      </div>
    </PostCardLayout>
  )
}

export default BlogPostCard
