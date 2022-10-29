// global
import React from 'react'
import {Link} from "react-router-dom";
// styles and icons
import './HomePage.scss';
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import MainSlider from "../../components/MainSlider/MainSlider";
import Navbar from "../../components/Navbar/Navbar";
import NewsMarquee from "../../components/NewsMarquee/NewsMarquee";
import StudentNav from "../../components/StudentNav/StudentNav";
import MapBlock from "../../components/MapBlock/MapBlock";

function HomePage() {
  return (
    <PageLayout>
      <div className="face-wrapper">
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
        <NewsMarquee />
      </div>
      <div className="content">
        <StudentNav />
        <MapBlock />
      </div>
      
    </PageLayout>
  )
}

export default HomePage
