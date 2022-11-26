// global
import React from 'react'
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import MapBlock from "../../components/MapBlock/MapBlock";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import FacePictureBlock from "../../components/FacePictureBlock/FacePictureBlock";
import MoreInfoCarouselBlock from "../../components/MoreInfoCarouselBlock/MoreInfoCarouselBlock";
import QuoteBlock from "../../components/QuoteBlock/QuoteBlock";
import MainActionBtns from "../../components/MainActionBtns/MainActionBtns";
import TextWithShortVariant, {FontSizeType} from "../../components/TextWithShortVariant/TextWithShortVariant";
import EnrollButton from "../../components/EnrollButton/EnrollButton";
// styles
import styles from '../../styles/pages/HomePage.module.scss'
// types
import type {Page_page_HomePage} from "../../graphql/generated";
import Link from "next/link";


function HomePage({faceBg, headings, quote}: Page_page_HomePage) {
  return (
    <PageLayout>
      <FacePictureBlock bgImage={faceBg?.file} >
        <MainActionBtns className={styles.faceBtns} />
        { headings.map((heading) => (
          <TextWithShortVariant
            key={`heading-${heading.id}`}
            text={heading.text}
            shortText={heading.shortText}
            size={heading.size as FontSizeType}
          />
        ))}
        <EnrollButton />
      </FacePictureBlock>
      <MoreInfoCarouselBlock>
        <Link className={styles.moreInfoBlock__slide} href="/" style={{"--index":  0} as React.CSSProperties}>
          <img src="/assets/s2.jpg" alt=""/>
        </Link>
        <Link className={styles.moreInfoBlock__slide} href="/" style={{"--index":  1} as React.CSSProperties}>
          <img src="/assets/s1.jpg" alt=""/>
        </Link>
        <Link className={styles.moreInfoBlock__slide} href="/" style={{"--index":  2} as React.CSSProperties}>
          <img src="/assets/s3.jpg" alt=""/>
        </Link>
      </MoreInfoCarouselBlock>
      { quote &&
        <QuoteBlock
          heading={quote.title}
          authorName={quote.author}
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
