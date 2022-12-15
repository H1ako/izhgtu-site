import gql from "graphql-tag";


export const PAGE_GETTER_QUERY = gql`
query Page($url: String!) {
  page (urlPath: $url) {
  id
  url
  pageType
  ... on HomePage {
    lastNews {
      id
      title
      createdAt
      post {
        url
      }
      picture {
        url
        title
      }
    }
    faceBg {
      title
      url
    }
    headings {
      id
      text
      shortText
      size
    }
    moreInfoCarousel {
      ... on VideoBlock {
        id
        __typename
        video {
          title
          url
          thumbnail
        }
      }
      ... on PictureBlock {
        id
        __typename
        link
        picture {
          title
          url
        }
      }
    }
    quote {
      title
      author
      authorPicture {
        title
        url
      }
      authorOccupation
      text
    }
  }
  ... on BlogPostPage {
    postPicture {
        title
        url
      }
      postAuthor {
        id
        fullName
        pictureUrl
      }
      postTags {
        id
        name
      }
      postCategory {
        name
        slug
      }
      postBody
      postTitle
    }
  }
}
`

const BLOG_POSTS_QUERY = gql`
query BlogPosts($perPage: Int, $page: Int) {
  blogPosts(perPage: 30, page: 1) {
    items {
      id
      url
      postPicture {
        url
        title
      }
      postTitle
    }
    pagination {
      count
      totalPages
      perPage
      prevPage
      nextPage
      total
      currentPage
    }
  }
}
`