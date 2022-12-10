// global
import React from 'react'
import Link from "next/link";
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import FacePictureBlock from "../../components/FacePictureBlock/FacePictureBlock";
// styles
import styles from './BlogPostPage.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
// types
import {Page_page_BlogPostPage} from "../../graphql/generated";


function BlogPostPage({postBody, postAuthor, postCategory, postTags, postPicture, postTitle}: Page_page_BlogPostPage) {
  return (
    <PageLayout>
      <FacePictureBlock bgImage={postPicture?.url}>
        <div className={styles.postHeading}>
          { postCategory &&
            <Link className={styles.postHeading__category} href={''}>{postCategory.name}</Link>
          }
          <h1 className={styles.postHeading__title}>{postTitle}</h1>
        </div>
      </FacePictureBlock>
      <div className={styles.content}>
        <div className={styles.content__postBody} dangerouslySetInnerHTML={{__html: postBody}}/>
        <div className={styles.content__bottomBlock}>
          <div className={styles.bottomBlock__inlineWrapper}>
            <div className="inlineWrapper__author">
            
            </div>
            <div className="inlineWrapper__btns">
              <button className="btns__btn">
                <FontAwesomeIcon icon={faDownload} />
                <span className="btn__text">Скачать</span>
              </button>
            </div>
          </div>
          <ul className="content__postTags">
            {postTags && postTags.map((tag) => (
              <li>
                <Link className={'postTags__tag'} href={'#'}>{tag?.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}

export default BlogPostPage
