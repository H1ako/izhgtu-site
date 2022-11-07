// global
import React from 'react'
import {Link} from "react-router-dom";
// styles and icons
import './HomePage.scss';
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import NewsMarquee from "../../components/NewsMarquee/NewsMarquee";
import MapBlock from "../../components/MapBlock/MapBlock";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import HorizontalSlider from "../../components/HorizontalSlider/HorizontalSlider";

function HomePage() {
  return (
    <PageLayout>
      <NewsMarquee />
      <HorizontalSlider>
        <li></li>
      </HorizontalSlider>
      <NewsBlock />
      <MapBlock />
    </PageLayout>
  )
}

export default HomePage
