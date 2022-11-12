// global
import React from 'react'
// components
import BlockHeading from "../BlockHeading/BlockHeading";
import News from "../News/News";
// styles and icons
import './NewsBlock.scss';

function NewsBlock() {
  return (
    <div className="news-block">
      <BlockHeading>
        Последние новости
      </BlockHeading>
      <News />
    </div>
  )
}

export default NewsBlock
