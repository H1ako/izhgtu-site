// global
import React from 'react'
// styles and icons
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import HorizontalSlider from "../../components/HorizontalSlider/HorizontalSlider";
import {Link} from "react-router-dom";

function HomePage() {
  return (
    <PageLayout>
      <div className="content">
        <HorizontalSlider>
          <Link to='/'>
            <img src="/assets/s1.jpg" alt="" />
          </Link>
          <Link to='/'>
            <img src="/assets/s2.jpg" alt="" />
          </Link>
          <Link to='/'>
            <img src="/assets/s3.jpg" alt="" />
          </Link>
          <Link to='/'>
            <img src="/assets/ava.png" alt="" />
          </Link>
        </HorizontalSlider>
      </div>
    </PageLayout>
  )
}

export default HomePage
