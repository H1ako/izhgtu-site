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
  const [ currentDateEvents, setCurrentDateEvents ] = React.useState<DateEvent[]>([])
  const dateEvents: DateEvent[] = [
    {
      id: 0,
      picture: '/assets/ev.jpg',
      name: 'Корпоратив',
      description: 'Встреча сотрудников',
      date: 'Wed Nov 02 2022 22:04:24 GMT+0400 (Самарское стандартное время)',
      updatedAt: '',
      createdAt: '',
      post: null
    },
    {
      id: 1,
      picture: '/assets/ev.jpg',
      name: 'Корпоратив',
      description: 'Встреча сотрудников',
      date: 'Wed Nov 02 2022 22:04:24 GMT+0400 (Самарское стандартное время)',
      updatedAt: '',
      createdAt: '',
      post: null
    },
    {
      id: 2,
      picture: '/assets/ev.jpg',
      name: 'Корпоратив',
      description: 'Встреча сотрудников',
      date: 'Wed Nov 02 2022 22:04:24 GMT+0400 (Самарское стандартное время)',
      updatedAt: '',
      createdAt: '',
      post: null
    },
    {
      id: 3,
      picture: '/assets/ev.jpg',
      name: 'Корпоратив',
      description: 'Встреча сотрудников',
      date: 'Wed Nov 02 2022 22:04:24 GMT+0400 (Самарское стандартное время)',
      updatedAt: '',
      createdAt: '',
      post: null
    },
    {
      id: 4,
      picture: '/assets/linkGroupBg.jpg',
      name: 'Корпоратив',
      description: 'Встреча сотрудников',
      date: 'Wed Nov 02 2022 22:04:24 GMT+0400 (Самарское стандартное время)',
      updatedAt: '',
      createdAt: '',
      post: null
    },
    {
      id: 5,
      picture: '/assets/ev.jpg',
      name: 'Корпоратив',
      description: 'Встреча сотрудников',
      date: 'Wed Nov 02 2022 22:04:24 GMT+0400 (Самарское стандартное время)',
      updatedAt: '',
      createdAt: '',
      post: null
    }
  ]
  
  const getDateEvents = (date: Date): DateEvent[] => {
    return dateEvents.filter((dateEvents => {
      const eventDate = new Date(dateEvents.date)
      
      return eventDate.toDateString() == date.toDateString()
    }))
  }
  
  React.useEffect(() => {
    const newDateEvents = getDateEvents(date)
    
    setCurrentDateEvents(newDateEvents)
  }, [date])
  
  return (
    <div className="event-calendar">
      <BlockHeading>
        Календарь Мероприятий
      </BlockHeading>
      <div className="event-calendar__area">
        <div className="area__events-block">
          { currentDateEvents.length ?
            <div className="events-block__date-info">
              <h4 className="date-info__date">{date.toDateString()}</h4>
              <ul className="date-info__events">
                {currentDateEvents.map(dateEvent => (
                  <li key={`date-event-${dateEvent.id}`} className="events__event">
                    <img className="event__image" src={dateEvent.picture} alt=""/>
                    <h4 className="event__name">{dateEvent.name}</h4>
                    <p className="event__description">{dateEvent.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            :
            <h3 className="events-block__status">Мероприятий на {date.toDateString()} не найдено</h3>
          }
        </div>
        <Calendar
          className="area__calendar"
          value={date}
          onChange={setDate}
          tileClassName={({date}) => {
            const dateEvent = getDateEvents(date)
            
            return `calendar__tile ${dateEvent.length && 'with-event'}`
          }}
        />
      </div>
    </div>
  )
}

export default EventCalendar
