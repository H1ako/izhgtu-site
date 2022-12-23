import '../styles/main/globals.scss'
import '../styles/main/accessibility.scss'
import '../styles/main/index.scss'
import {RecoilRoot} from "recoil";
import {ApolloProvider} from "@apollo/client";
import client from "../apollo-client";
// types
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </RecoilRoot>
  )
}
