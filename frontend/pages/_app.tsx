import '../styles/globals.scss'
import '../styles/main/index.scss'
import type { AppProps } from 'next/app'
import {RecoilRoot} from "recoil";
import {ApolloProvider} from "@apollo/client";
import client from "../apollo-client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </RecoilRoot>
  )
}
