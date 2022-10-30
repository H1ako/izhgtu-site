// global
import React from 'react'
// styles and icons
import 'react-calendar/dist/Calendar.css';
import './EventCalendar.scss';
// components
import BlockHeading from "../BlockHeading/BlockHeading";
import Calendar from "react-calendar";

function EventCalendar() {
  const [ date, setDate ] = React.useState<Date>(new Date())
  const [ dateToDisplay, setDateToDisplay ] = React.useState<DateEvent | undefined>()
  const dateEvents: DateEvent[] = [
    {
      date: new Date(),
      info: 'Корпоратив'
    }
  ]
  
  const getDateEventByDate = (date: Date): DateEvent | undefined => {
    return dateEvents.find((dateEvents => {
      return dateEvents.date.getDate() == date.getDate()
    }))
  }
  
  return (
    <div className="event-calendar">
      <BlockHeading>
        Календарь Мероприятий
      </BlockHeading>
      <Calendar
        className="event-calendar__calendar"
        value={date}
        onChange={setDate}
        tileClassName="calendar__tile"
        tileContent={({date}) => (
          <div className="info">{getDateEventByDate(date)?.info}</div>
        )}
        // tileContent={
        //   <div className="tile__info">{dateToDisplay?.info}</div>
        // }
      />
    </div>
  )
}

export default EventCalendar
