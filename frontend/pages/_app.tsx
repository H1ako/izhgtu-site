// global
import React from "react";
import {RecoilRoot} from "recoil";
import {ApolloProvider} from "@apollo/client";
import client from "../apollo-client";
// components
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SearchWindow from "../components/SearchWindow/SearchWindow";
import AccessibilityMenu from "../components/AccessibilityMenu/AccessibilityMenu";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import Lightbox from "../components/Lightbox/Lightbox";
// styles
import '../styles/main/globals.scss'
import '../styles/main/accessibility.scss'
import '../styles/main/index.scss'
// types
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <Header />
        <Component {...pageProps} />
        <Footer />
        <SearchWindow />
        <AccessibilityMenu />
        <LoadingScreen />
        <Lightbox />
      </ApolloProvider>
    </RecoilRoot>
  )
}
