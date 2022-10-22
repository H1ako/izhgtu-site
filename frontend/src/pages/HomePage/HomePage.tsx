// global
import React from 'react'
import {Link} from "react-router-dom";
// styles and icons
import './HomePage.scss';
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import MainSlider from "../../components/MainSlider/MainSlider";
import Navbar from "../../components/Navbar/Navbar";

function HomePage() {
  return (
    <PageLayout>
      <MainSlider>
        <Link to='/'>
          <img src="/assets/s1.jpg" alt="" />
        </Link>
        <Link to='/'>
          <img src="/assets/s2.jpg" alt="" />
        </Link>
        <Link to='/'>
          <img src="/assets/s3.jpg" alt="" />
        </Link>
      </MainSlider>
      <Navbar />
    </PageLayout>
  )
}

export default HomePage
