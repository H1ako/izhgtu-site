import gql from "graphql-tag";

export const PAGE_GETTER_QUERY = gql`
query Page($url: String!) {
    page (urlPath: $url) {
        id
        url
        pageType
        ... on HomePage {
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
                picture {
                    url
                    title
                }
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
