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
import {ColorRing} from "react-loader-spinner";


function BlogPostIndexPage({faceTitle, facePicture}: Page_page_BlogPostIndexPage) {
  const {loading, data, error, refetch} = useQuery<BlogPosts, BlogPostsVariables>(BLOG_POSTS_QUERY, {
    variables: {
      page: 1,
      perPage: 30
    },
  })
  
  React.useEffect(() => {
    refetch()
  }, [])

  return (
    <PageLayout>
      <FacePictureBlockBlured className={styles.faceBlock} bgImage={facePicture?.url}>
        <h1>{faceTitle}</h1>
      </FacePictureBlockBlured>
      <div className={styles.content}>
        <aside className={styles.filtersBar}></aside>
        <div className={styles.content__postsArea}>
          { !loading && !error &&
            <ul className={styles.postsArea__posts}>
              { data?.blogPosts?.items && data.blogPosts.items.map(post => (
                <BlogPostCard
                  key={`post-${post.id}`}
                  title={post.postTitle}
                  picture={post.postPicture?.url}
                  date={post.firstPublishedAt}
                  url={post.url}
                />
              ))}
            </ul>
          }
          <button className={styles.postsArea__loadMore}>
            <ColorRing
              visible={true}
              ariaLabel="blocks-loading"
              wrapperClass={styles.loadMore__spinner}
              colors={['white', 'white', 'white', 'white', 'white']}
            />
            Загрузить ещё
          </button>
        </div>
      </div>
    </PageLayout>
  )
}

export default BlogPostIndexPage
