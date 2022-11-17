// global
import React from 'react'
import {graphql, PageProps} from "gatsby";
// components
// styles and icons
import './HomePage.scss';
import PageLayout from "../containers/PageLayout/PageLayout";
import FacePictureBlock from "../components/FacePictureBlock/FacePictureBlock";
import PrincipalQuoteBlock from "../components/PrincipalQuoteBlock/PrincipalQuoteBlock";
import MoreInfoBlock from "../components/MoreInfoBlock/MoreInfoBlock";
import NewsBlock from "../components/NewsBlock/NewsBlock";
import MapBlock from "../components/MapBlock/MapBlock";

function HomePage(props: PageProps) {
  console.log(props)
  return (
    <PageLayout>
      <FacePictureBlock />
      <MoreInfoBlock />
      <PrincipalQuoteBlock />
      <NewsBlock />
      <MapBlock />
    </PageLayout>
  )
}

export default HomePage

export const query = graphql`
  {
    frontend {
      siteMetadata {
        title
      }
    }
  }
`