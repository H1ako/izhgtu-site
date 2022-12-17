// global
import React from 'react'
import Link from "next/link";
import {useInView} from "react-intersection-observer";
import client from "../../apollo-client";
import {BLOG_POSTS_QUERY} from "../../graphql/queries/pageQueries";
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import FacePictureBlockBlured from "../../components/FacePictureBlockBlured/FacePictureBlockBlured";
// styles
import styles from './BlogPostIndexPage.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
// types
import {GetServerSidePropsContext} from "next";
import {BlogPosts_blogPosts, BlogPostsVariables, Page_page_BlogPostIndexPage} from "../../graphql/generated";
import {data} from "browserslist";
import {useQuery} from "@apollo/client";


function BlogPostIndexPage({faceTitle, facePicture}: Page_page_BlogPostIndexPage) {
  const [posts, setPosts] = React.useState<BlogPosts_blogPosts>()
  const {loading, data, error, refetch} = useQuery<BlogPosts_blogPosts, BlogPostsVariables>(BLOG_POSTS_QUERY, {
    variables: {
      page: 1,
      perPage: 30
    },
    fetchPolicy: "network-only"
  })
  
  React.useEffect(() => {
    refetch()
    console.log(data)
  }, [data])
  
  return (
    <PageLayout>
      <FacePictureBlockBlured className={styles.faceBlock} bgImage={facePicture?.url}>
        <h1>{faceTitle}</h1>
      </FacePictureBlockBlured>
  
      { !loading && !error &&
        <ul className={styles.content__posts}>
          { data?.items && data.items.map(posts => (
            <li></li>
          ))
          }
        </ul>
      }
    </PageLayout>
  )
}

export default BlogPostIndexPage
