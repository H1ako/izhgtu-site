// global
import React from 'react'
import Link from "next/link";
import {useInView} from "react-intersection-observer";
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import FacePictureBlockBlured from "../../components/FacePictureBlockBlured/FacePictureBlockBlured";
// styles
import styles from './BlogPostIndexPage.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
// types


function BlogPostIndexPage({}: any) {
  return (
    <PageLayout>
      <FacePictureBlockBlured className={styles.faceBlock} bgImage={''}>
        <h1>БЛОГ</h1>
      </FacePictureBlockBlured>
      
      <ul className={styles.content__posts}>
      
      </ul>
    </PageLayout>
  )
}

export default BlogPostIndexPage
