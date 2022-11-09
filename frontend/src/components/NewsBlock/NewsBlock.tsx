// global
import React from 'react'
// styles and icons
import './NewsBlock.scss';
// components
import BlockHeading from "../BlockHeading/BlockHeading";
import News from "../News/News";

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
