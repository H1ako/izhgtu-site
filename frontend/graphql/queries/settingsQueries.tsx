import gql from "graphql-tag";

export const SETTINGS_GETTER_QUERY = gql`
query Settings {
  settings {
    ... on MainContentSettings {
      yandexMapUrl
      orgName
      shortOrgName
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
            name
            page {
              url
            }
            openInNewTab
            linksGroups {
              url
              name
              page {
                url
              }
              openInNewTab
              linksGroups {
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
                    
            
            