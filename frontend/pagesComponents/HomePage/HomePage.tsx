// global
import React from 'react'
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import MapBlock from "../../components/MapBlock/MapBlock";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import FacePictureBlock from "../../components/FacePictureBlock/FacePictureBlock";
import MoreInfoBlock from "../../components/MoreInfoBlock/MoreInfoBlock";
import {Page_page_HomePage} from "../../graphql/generated";
import QuoteBlock from "../../components/QuoteBlock/QuoteBlock";


function HomePage({faceBg, faceBody, quote}: Page_page_HomePage) {
  return (
    <PageLayout>
      <FacePictureBlock />
      <MoreInfoBlock />
      { quote &&
        <QuoteBlock
          authorName={quote.author as string}
          authorOccupation={quote.authorOccupation}
          authorPicture={quote.authorPicture?.file}
          quote={quote.text}
        />
      }
      <NewsBlock />
      <MapBlock />
    </PageLayout>
  )
}

export default HomePage
