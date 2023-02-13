import gql from "graphql-tag";


export const AUTH_USER_GETTER_QUERY = gql`
  query AuthUser {
    authUser {
      id
      isSignedUp
      email
      mobile
      isEntrant
      isStudent
      isTeacher
      profileUrl
      profile {
        tags {
          id
          name
          description
        }
        firstName
        lastName
        patronymic
        birthDate
        fullName
        pictureUrl
        bgPictureUrl
        aboutMe
        achievements {
          id
          showInProfile
          achievement {
            title
            description
            shortDescription
            icon {
              url
              fullUrl
              title
            }
          }
        }
        contacts {
          id
          title
          value
        }
      }
      student {
        id
        learningBuilding
        studentCard {
          cardId
        }
        group {
          name
          year
          teachers {
            id
            subjects {
              id
              name
            }
            teacher {
              user {
                profileUrl
                profile {
                  fullName
                  pictureUrl
                }
                email
                mobile
              }
              subjects {
                id
                name
              }
            }
          }
          students {
            id
            user {
              profileUrl
              profile {
                fullName
                pictureUrl
              }
              email
              mobile
            }
          }
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
            profileUrl
            profile {
              fullName
              pictureUrl
            }
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
          subjects {
            id
            name
          }
        }
      }
      entrant {
        id
      }
    }
  }
`