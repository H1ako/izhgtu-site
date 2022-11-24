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
                file
            }
            faceBody {
                ... on TextWithShortVariantBlock {
                    blockType
                    text
                    shortText
                    size
              }
            }
            quote {
                id
                author
                authorPicture {
                    title
                    file
                }
                authorOccupation
                text
            }
        }
    }
}
`
