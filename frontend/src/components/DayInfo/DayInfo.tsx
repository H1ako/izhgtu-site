// global
import React from 'react'
// styles and icons
import './DayInfo.scss';

function DayInfo() {
  return (
    <div className="day-info">
      <h5 className="day-info__part day-info__date">
        Понедельник, 10 октября, 2022г.
      </h5>
      <h5 className="day-info__part day-info__lesson">
        7 пара, до конца 20 мин.
      </h5>
      <h5 className="day-info__part day-info__week-type">
        Неделя над чертой
      </h5>
    </div>
  )
}

export default DayInfo
