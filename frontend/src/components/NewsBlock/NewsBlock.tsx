// global
import React from 'react'
// styles and icons
import './NewsBlock.scss';
// components
import BlockHeading from "../BlockHeading/BlockHeading";

function NewsBlock() {
  return (
    <div className="news-block">
      <BlockHeading>
        Последние новости
      </BlockHeading>
    </div>
  )
}

export default NewsBlock
