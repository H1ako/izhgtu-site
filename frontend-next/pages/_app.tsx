import '../styles/globals.css'
import '../styles/main/index.scss'
import type { AppProps } from 'next/app'
import {RecoilRoot} from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}
