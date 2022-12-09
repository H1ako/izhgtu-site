import gql from "graphql-tag";

export const SETTINGS_GETTER_QUERY = gql`
query Settings {
  settings {
    ... on MainContentSettings {
      yandexMapUrl
      logo {
        url
        title
      }
      header {
        name
        menu {
          id
          title
          linksGroups {
            url
            page {
              __typename
              url
            }
            openInNewTab
            linksGroups {
              url
              page {
                __typename
                url
              }
              openInNewTab
              linksGroups {
                url
                page {
                  __typename
                }
                openInNewTab
              }
            }
          }
        }
        showLastNewsMarquee
        locations {
          id
          name
          address
          description
        }
        contacts {
          id
          address
          type
        }
        socials {
          id
          name
          url
          icon {
            url
            title
          }
        }
      }
      footer {
        name
        rightDescription
        showContactForm
        menu {
          __typename
          ... on FooterMenuLinkUrl {
            id
            name
            url
          }
          ... on FooterMenuLinkPage {
            name
            page {
              url
            }
          }
        }
      }
    }
  }
}
`
                    
            
            