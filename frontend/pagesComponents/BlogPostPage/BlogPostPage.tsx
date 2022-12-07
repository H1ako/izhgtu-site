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
      <FacePictureBlock>
        <div className="postHeading">
          { postCategory &&
            <h3 className="postHeading__category">{postCategory.name}</h3>
          }
          <h1 className="postHeading__title">{postTitle}</h1>
        </div>
      </FacePictureBlock>
      <div className="content">
        <div className="content__postBody" dangerouslySetInnerHTML={{__html: postBody}}/>
        <ul className="content__postTags">
          {postTags && postTags.map((tag) => (
            <li>
              <Link className={'postTags__tag'} href={'#'}>{tag?.name}</Link>
            </li>
          ))}
          
        </ul>
        <div className="content__inlineWrapper">
          <div className="inlineWrapper__author"></div>
          <div className="inlineWrapper__btns">
            <button className="btns__btn">
              <FontAwesomeIcon icon={faDownload} />
              <span className="btn__text">Скачать</span>
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default BlogPostPage
