import gql from "graphql-tag";

export const SETTINGS_GETTER_QUERY = gql`
query Settings {
    settings {
        __typename
        ... on MainContentSettings {
            id
            header {
                id
                name
                menu {
                    id
                    title
                    linksGroup {
                        id
                        url
                        page {
                            id
                            url
                            title
                        }
                        openInNewTab
                        linksGroup {
                            id
                            url
                            page {
                                id
                                url
                                title
                            }
                            openInNewTab
                            linksGroup {
                                id
                                url
                                page {
                                    id
                                    url
                                    title
                                }
                                openInNewTab
                            }
                        }
                    }
                }
                contacts {
                    id
                    name
                    address
                    type
                }
                locations {
                    id
                    name
                    address
                    description
                }
                socials {
                    id
                    name
                    url
                    icon {
                        id
                        url
                        title
                    }
                }
            }
            footer {
                id
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
            logo {
                id
                title
                url
            }
        }
    }
}
`
                    
            
            