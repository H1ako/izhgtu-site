import gql from "graphql-tag";

export const SETTINGS_GETTER_QUERY = gql`
query Settings {
  settings {
    ... on MainUrlsSettings {
      logoutUrl
    }
    ... on MainContentSettings {
      yandexMapUrl
      orgName
      shortOrgName
      logo {
        url
        fullUrl
        title
      }
      header {
        name
        menu {
          id
          title
          linksGroups {
            id
            url
            name
            page {
              url
            }
            openInNewTab
            linksGroups {
              id
              url
              name
              page {
                url
              }
              openInNewTab
              linksGroups {
                id
                url
                name
                page {
                  url
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
          name
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
            fullUrl
          }
        }
      }
      footer {
        name
        rightDescription
        showContactForm
        socials {
          id
          name
          url
          icon {
            url
            title
            fullUrl
          }
        }
        menu {
          __typename
          ... on FooterMenuLinkUrl {
            id
            name
            url
          }
          ... on FooterMenuLinkPage {
            id
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
                    
            
            