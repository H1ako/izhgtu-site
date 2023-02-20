import {ApolloClient, InMemoryCache, gql, HttpLink} from "@apollo/client";


const graphqlLink = new HttpLink({
  uri: 'http://127.0.0.1:8000/api/graphql/',
  fetchOptions: {
    mode: 'cors',
  },
  credentials: 'include',
})


const client = new ApolloClient({
  connectToDevTools: process.browser,
  ssrMode: !process.browser,
  credentials: 'include',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          blogPosts: {
            keyArgs: false,
            merge(existing = {
              items: [],
              pagination: {}
            }, incoming) {
              return getMergedBlogPosts(existing, incoming)
            },
          }
        }
      }
    }
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      context: {
        errorPolicy: 'all',
        credentials: 'include',
      },
    }
  },
  link: graphqlLink
})


function getMergedBlogPosts(existing: any, incoming: any) {
  const items = [...existing.items]
  
  for (const item of incoming.items) {
    if (!existing.items.find((i: any) => i.__ref === item.__ref)) {
      items.push(item)
    }
  }
  
  return {
    items: items,
    pagination: incoming.pagination,
  }
}

export default client
