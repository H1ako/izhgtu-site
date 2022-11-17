// global
import React from 'react'
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import MapBlock from "../../components/MapBlock/MapBlock";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import FacePictureBlock from "../../components/FacePictureBlock/FacePictureBlock";
import MoreInfoBlock from "../../components/MoreInfoBlock/MoreInfoBlock";
import PrincipalQuoteBlock from "../../components/PrincipalQuoteBlock/PrincipalQuoteBlock";
// styles and icons
import '../../styles/pages/HomePage.module.scss';

function HomePage(props: any) {
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
