// global
import React from "react";
// components
import PostCardLayout, {PostCardProps} from "../../containers/PostCardLayout/PostCardLayout";
// styles and icons
import styles from './BlogPostCard.module.scss';


interface BlogPostCardProps extends PostCardProps {}


function BlogPostCard({className='', title, picture, date, infoClassName}: BlogPostCardProps) {
  return (
    <PostCardLayout
      className={`${styles.blogPostCard} ${className}`}
      infoClassName={infoClassName}
      title={title}
      picture={picture}
      date={date}
    >
    
    </PostCardLayout>
  )
}

export default BlogPostCard
