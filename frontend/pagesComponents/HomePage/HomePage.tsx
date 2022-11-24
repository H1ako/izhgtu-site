// global
import React from 'react'
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import MapBlock from "../../components/MapBlock/MapBlock";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import FacePictureBlock from "../../components/FacePictureBlock/FacePictureBlock";
import MoreInfoBlock from "../../components/MoreInfoBlock/MoreInfoBlock";
import QuoteBlock from "../../components/QuoteBlock/QuoteBlock";
import MainActionBtns from "../../components/MainActionBtns/MainActionBtns";
import TextWithShortVariant from "../../components/TextWithShortVariant/TextWithShortVariant";
import EnrollButton from "../../components/EnrollButton/EnrollButton";
// types
import {Page_page_HomePage} from "../../graphql/generated";
// styles
import styles from '../../styles/pages/HomePage.module.scss'


function HomePage({faceBg, headings, quote}: Page_page_HomePage) {
  console.log(headings)
  return (
    <PageLayout>
      <FacePictureBlock bgImage={faceBg?.file} >
        <MainActionBtns className={styles.faceBtns} />
        { headings.map((heading) => (
          <TextWithShortVariant
            text={heading.text}
            shortText={heading.shortText}
            size={heading.size}
          />
        ))}
        <EnrollButton />
      </FacePictureBlock>
      <MoreInfoBlock />
      { quote &&
        <QuoteBlock
          heading="Об ИжГТУ"
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
