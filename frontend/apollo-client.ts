import {ApolloClient, InMemoryCache, gql, HttpLink} from "@apollo/client";


const graphqlLink = new HttpLink({
    uri: 'http://127.0.0.1:8000/api/graphql/',
    fetchOptions: {
        mode: 'cors',
    },
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: { query: { fetchPolicy: 'no-cache', context: {
      errorPolicy: 'ignore',
    }} },
    link: graphqlLink
});

export default client;