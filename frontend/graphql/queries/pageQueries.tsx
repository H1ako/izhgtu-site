import gql from "graphql-tag";


export const PAGE_GETTER_QUERY = gql`
query Page($url: String!) {
  page (urlPath: $url) {
    id
    url
    pageType
    ... on LoginPage {
      isPasswordEnabled
      isGosUslugiEnabled
      isPhoneCodeEnabled
      isVkontakteEnabled
      signInMethods {
        id
        name
        label
        enabled
      }
      signUpMethods {
        id
        name
        label
        enabled
      }
    }
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
    ... on BlogPostIndexPage {
      faceTitle
      facePicture {
        url
        title
      }
      filters {
        type
        name
        slug
        values {
          name
          value
        }
      }
    }
  }
}
`
  
export const BLOG_POSTS_QUERY = gql`
query BlogPosts($perPage: PositiveInt, $page: PositiveInt, $tags: [String!], $categories: [Int!], $authors: [Int!], $searchQuery: String) {
  blogPosts(perPage: $perPage, page: $page, postTags_Slug_In: $tags, postCategory_Id_In: $categories, postAuthor_Id_In: $authors, searchQuery: $searchQuery) {
    items {
      id
      url
      postPicture {
        url
        title
      }
      postTitle
      postTags {
        id
        name
      }
      firstPublishedAt
      postCategory {
        id
        name
      }
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