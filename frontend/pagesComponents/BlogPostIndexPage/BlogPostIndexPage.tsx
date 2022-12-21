// global
import React from 'react'
import Link from "next/link";
import {useQuery} from "@apollo/client";
// queries
import {BLOG_POSTS_QUERY} from "../../graphql/queries/pageQueries";
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import FacePictureBlockBlured from "../../components/FacePictureBlockBlured/FacePictureBlockBlured";
import BlogPostCard from "../../components/BlogPostCard/BlogPostCard";
// styles
import styles from './BlogPostIndexPage.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
// types
import {GetServerSidePropsContext} from "next";
import {BlogPosts, BlogPostsVariables, Page_page_BlogPostIndexPage} from "../../graphql/generated";


function BlogPostIndexPage({faceTitle, facePicture}: Page_page_BlogPostIndexPage) {
  const {loading, data, error, refetch} = useQuery<BlogPosts, BlogPostsVariables>(BLOG_POSTS_QUERY, {
    variables: {
      page: 1,
      perPage: 30
    },
  })
  
  React.useEffect(() => {
    console.log(data)
    refetch()
  }, [])

  return (
    <PageLayout>
      <FacePictureBlockBlured className={styles.faceBlock} bgImage={facePicture?.url}>
        <h1>{faceTitle}</h1>
      </FacePictureBlockBlured>
  
      <div className={styles.content}>
        <aside className={styles.filtersBar}></aside>
        { true && // !loading && !error
          <ul className={styles.content__posts}>
            { data?.blogPosts?.items && data.blogPosts.items.map(post => (
              <BlogPostCard
                key={`post-${post.id}`}
                title={post.postTitle}
                picture={post.postPicture?.url}
                date={post.firstPublishedAt}
              />
            ))
            }
          </ul>
        }
      </div>
    </PageLayout>
  )
}

export default BlogPostIndexPage
