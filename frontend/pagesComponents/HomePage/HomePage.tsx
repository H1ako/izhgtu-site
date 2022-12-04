// global
import React from 'react'
import Link from "next/link";
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
import styles from './HomePage.module.scss'
// types
import type {Page_page_HomePage} from "../../graphql/generated";


function HomePage({faceBg, headings, quote, moreInfoCarousel}: Page_page_HomePage) {
  return (
    <PageLayout>
      <FacePictureBlock bgImage={faceBg?.url} >
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
      { moreInfoCarousel &&
        <MoreInfoCarouselBlock>
          { moreInfoCarousel.map((slide) => {
            if (!slide) return <></>
            else if (slide.__typename === 'VideoBlock') return (
              <video
                key={`video-${slide.id}`}
                src={slide.video.url}
                controls
                poster={`/media/${slide.video.thumbnail}`}
              />
            )
            else if (slide.__typename === 'PictureBlock') return (
              <Link key={`picture-${slide.id}`} href={slide.link ?? ''} hidden={true}>
                <img src={slide.picture.url} alt="" />
              </Link>
            )
          })}
      </MoreInfoCarouselBlock>
      }
      { quote &&
        <QuoteBlock
          heading={quote.title}
          authorName={quote.author}
          authorOccupation={quote.authorOccupation}
          authorPicture={quote.authorPicture?.url}
          quote={quote.text}
        />
      }
      <NewsBlock />
      <MapBlock />
    </PageLayout>
  )
}

export default HomePage
