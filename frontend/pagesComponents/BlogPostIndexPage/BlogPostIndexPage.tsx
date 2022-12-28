// global
import React from 'react'
import Link from "next/link";
import {ColorRing} from "react-loader-spinner";
import {useQuery} from "@apollo/client";
// queries
import {BLOG_POSTS_QUERY} from "../../graphql/queries/pageQueries";
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import FacePictureBlockBlured from "../../components/FacePictureBlockBlured/FacePictureBlockBlured";
import BlogPostCard from "../../components/BlogPostCard/BlogPostCard";
import FiltersBar, {ChosenFiltersType} from "../../components/FiltersBar/FiltersBar";
import SearchField from "../../components/SearchField/SearchField";
// styles and icons
import styles from './BlogPostIndexPage.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
// types
import {GetServerSidePropsContext} from "next";
import {BlogPosts, BlogPostsVariables, Page_page_BlogPostIndexPage} from "../../graphql/generated";
import {useInView} from "react-intersection-observer";


const PER_PAGE = 30


function BlogPostIndexPage({faceTitle, facePicture, filters}: Page_page_BlogPostIndexPage) {
  const [ faceSearchQuery, setFaceSearchQuery ] = React.useState<string>('')
  const [ page, setPage ] = React.useState<number>(1)
  const {ref: loadMoreRef, inView} = useInView({
    threshold: 0,
  })
  const {loading, data, error, refetch, fetchMore} = useQuery<BlogPosts, BlogPostsVariables>(BLOG_POSTS_QUERY, {
    variables: {
      page: page,
      perPage: PER_PAGE,
    },
  })
  const onFilterChange = (filters: ChosenFiltersType) => {
    setPage(1)
 
    // fetchMore({
    //   variables: {
    //     page: page,
    //     ...filters
    //   }
    // })
    refetch({
      page: 1,
      ...filters
    })
  }
  
  React.useEffect(() => {
    if (!inView) return
    
    setPage(curPage => {
      const newPage = curPage + 1
      
      fetchMore({
        variables: {
          page: newPage,
          ...filters
        }
      })
      
      return newPage
    })
  }, [inView])

  return (
    <PageLayout>
      <FacePictureBlockBlured className={styles.faceBlock} bgImage={facePicture?.url}>
        <h1 className={styles.faceBlock__heading}>{faceTitle}</h1>
        <SearchField
          className={styles.faceBlock__searchField}
          placeholder="ПОИСК"
          value={faceSearchQuery}
          setValue={setFaceSearchQuery}
        />
      </FacePictureBlockBlured>
      <div className={styles.content}>
        <FiltersBar
          filters={filters}
          onFilterStateChange={onFilterChange}
        />
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
          {console.log(data?.blogPosts?.pagination?.totalPages, data?.blogPosts?.pagination?.totalPages > page)}
          { data?.blogPosts?.pagination?.totalPages && data.blogPosts.pagination.totalPages > page &&
            <button className={styles.postsArea__loadMore} ref={loadMoreRef} onClick={() => refetch()}>
              <ColorRing
                visible={true}
                ariaLabel="blocks-loading"
                wrapperClass={styles.loadMore__spinner}
                colors={['white', 'white', 'white', 'white', 'white']}
              />
              Загрузить ещё
            </button>
          }
        </div>
      </div>
    </PageLayout>
  )
}

export default BlogPostIndexPage
