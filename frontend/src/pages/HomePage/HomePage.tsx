// global
import React from 'react'
// styles and icons
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import HorizontalSlider from "../../components/HorizontalSlider/HorizontalSlider";

function HomePage() {
  return (
    <PageLayout>
      <div className="content">
        <HorizontalSlider>
          <img src="/assets/s1.jpg" alt="" />
          <img src="/assets/s2.jpg" alt="" />
          <img src="/assets/s3.jpg" alt="" />
        </HorizontalSlider>
      </div>
    </PageLayout>
  )
}

export default HomePage
