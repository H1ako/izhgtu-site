import gql from "graphql-tag";

export const USER_GETTER_QUERY = gql`
query User($id: ID!) {
    user (id: $id) {
        id
        firstName
        lastName
        fullName
        phone
        tags {
            id
            name
            description
        }
        isEntrant
        isStudent
        isTeacher
        email
        picture {
            title
            url
        }
    }
}
`