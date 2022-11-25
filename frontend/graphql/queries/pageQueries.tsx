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
            headings {
                id
                text
                shortText
                size
            }
            quote {
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
