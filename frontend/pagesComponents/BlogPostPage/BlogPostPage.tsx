// global
import React from 'react'
import Link from "next/link";
import {useInView} from "react-intersection-observer";
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import FacePictureBlockBlured from "../../components/FacePictureBlockBlured/FacePictureBlockBlured";
import UserMiniCard from "../../components/UserMiniCard/UserMiniCard";
// styles
import styles from './BlogPostPage.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
// types
import {Page_page_BlogPostPage} from "../../graphql/generated";


function BlogPostPage({postBody, postAuthor, postCategory, postTags, postPicture, postTitle}: Page_page_BlogPostPage) {
  return (
    <PageLayout>
      <FacePictureBlockBlured bgImage={postPicture?.url}>
        { postCategory &&
          <Link className={styles.faceCategory} href={''}>{postCategory.name}</Link>
        }
        <h1 className={styles.faceTitle}>{postTitle}</h1>
      </FacePictureBlockBlured>
      <div className={styles.postBody} dangerouslySetInnerHTML={{__html: postBody}}/>
      <div className={styles.bottomBlock}>
        <div className={styles.bottomBlock__content}>
          <div className={styles.content__inlineWrapper}>
            { postAuthor &&
              <UserMiniCard userName={postAuthor.profile.fullName} userPicture={postAuthor.profile.pictureUrl}/>
            }
            <div className={styles.inlineWrapper__btns}>
              <button className={styles.btns__btn}>
                <FontAwesomeIcon icon={faDownload} />
                <span className={styles.btn__text}>Скачать</span>
              </button>
            </div>
          </div>
          <ul className={styles.content__postTags}>
            {postTags && postTags.map((tag) => (
              <li key={tag?.id}>
                <Link className={styles.postTags__tag} href={'#'}>#{tag?.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}

export default BlogPostPage
