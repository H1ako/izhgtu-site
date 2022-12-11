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
import UserMiniCard from "../../components/UserMiniCard/UserMiniCard";
import {useRecoilValue} from "recoil";
import {headerActiveStateAtom} from "../../recoilAtoms/headerAtoms";
import {useInView} from "react-intersection-observer";


function BlogPostPage({postBody, postAuthor, postCategory, postTags, postPicture, postTitle}: Page_page_BlogPostPage) {
  const isHeaderActive = useRecoilValue(headerActiveStateAtom)
  
  return (
    <PageLayout>
      <FacePictureBlock bgImage={postPicture?.url}>
        <div className={`${styles.postHeading} ${isHeaderActive ? '' : styles.headerActive}`}>
          { postCategory &&
            <Link className={styles.postHeading__category} href={''}>{postCategory.name}</Link>
          }
          <h1 className={styles.postHeading__title}>{postTitle}</h1>
        </div>
      </FacePictureBlock>
      <div className={styles.postBody} dangerouslySetInnerHTML={{__html: postBody}}/>
      <div className={styles.bottomBlock}>
        <div className={styles.bottomBlock__content}>
          <div className={styles.content__inlineWrapper}>
            { postAuthor &&
              <UserMiniCard userName={postAuthor.fullName} userPicture={postAuthor.pictureUrl}/>
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
                <Link className={styles.postTags__tag} href={'#'}>{tag?.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}

export default BlogPostPage
