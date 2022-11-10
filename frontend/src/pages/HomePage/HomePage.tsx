// global
import React from 'react'
import {Link} from "react-router-dom";
// styles and icons
import './HomePage.scss';
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import MapBlock from "../../components/MapBlock/MapBlock";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import FacePictureBlock from "../../components/FacePictureBlock/FacePictureBlock";
import MoreInfoBlock from "../../components/MoreInfoBlock/MoreInfoBlock";
import PrincipalQuoteBlock from "../../components/PrincipalQuoteBlock/PrincipalQuoteBlock";

function HomePage() {
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
