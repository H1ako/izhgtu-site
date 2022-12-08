import gql from "graphql-tag";


export const AUTH_USER_GETTER_QUERY = gql`
  query AuthUser {
    authUser {
      id
      fullName
      email
      phone
      isEntrant
      isStudent
      isTeacher
      pictureUrl
      bgPictureUrl
      student {
        id
        studentCard {
          cardId
        }
        group {
          name
          educationForm {
            name
          }
          specialization {
            name
            faculty {
              name
              educationType {
                name
              }
            }
          }
          leader {
            fullName
            isTeacher
          }
          subjects {
            id
            name
          }
        }
      }
      teacher {
        subjects {
          id
          name
        }
        groups {
          id
          name
        }
      }
      entrant {
        id
      }
      tags {
        id
        name
        description
      }
    }
  }
`