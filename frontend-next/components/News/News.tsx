// global
import React from 'react'
// components
// styles and icons
import '../../styles/components/News.module.scss';
import Link from "next/link";

interface NewsProps {
  className?: string
}

type NewsIndexType = number | null

function News({className=''}: NewsProps) {
  const [ newsList, setNewsList ] = React.useState<News[]>([
    {
      id: 0,
      name: 'Поздравляем с Юбилеем! Александру Аркадьевичу — 75 лет!',
      description: 'Александр Аркадьевич — квалифицированный педагог, чуткий и внимательный человек. Эти качества позволяют ему находить общий язык как с преподавателями, так и со студентами, направляя их усилия в русло сотрудничества, достижения единой благородной цели — подготовки высококвалифицированных инженерных и научных кадров.',
      post: null,
      date: 'Четверг, 27 октября 2022',
      picture: '/assets/news1.jpg',
      createdAt: '',
      updatedAt: ''
    },
    {
      id: 1,
      name: 'Поздравляем с Юбилеем! Александру Аркадьевичу — 75 лет!',
      description: 'Александр Аркадьевич — квалифицированный педагог, чуткий и внимательный человек. Эти качества позволяют ему находить общий язык как с преподавателями, так и со студентами, направляя их усилия в русло сотрудничества, достижения единой благородной цели — подготовки высококвалифицированных инженерных и научных кадров.',
      post: null,
      date: 'Четверг, 27 октября 2022',
      picture: '/assets/ev.jpg',
      createdAt: '',
      updatedAt: ''
    },
    {
      id: 2,
      name: 'Поздравляем с Юбилеем! Александру Аркадьевичу — 75 лет!',
      description: 'Александр Аркадьевич — квалифицированный педагог, чуткий и внимательный человек. Эти качества позволяют ему находить общий язык как с преподавателями, так и со студентами, направляя их усилия в русло сотрудничества, достижения единой благородной цели — подготовки высококвалифицированных инженерных и научных кадров.',
      post: null,
      date: 'Четверг, 27 октября 2022',
      picture: '/assets/news1.jpg',
      createdAt: '',
      updatedAt: ''
    },
    {
      id: 3,
      name: 'Поздравляем с Юбилеем! Александру Аркадьевичу — 75 лет!',
      description: 'Александр Аркадьевич — квалифицированный педагог, чуткий и внимательный человек. Эти качества позволяют ему находить общий язык как с преподавателями, так и со студентами, направляя их усилия в русло сотрудничества, достижения единой благородной цели — подготовки высококвалифицированных инженерных и научных кадров.',
      post: null,
      date: 'Четверг, 27 октября 2022',
      picture: '/assets/ev.jpg',
      createdAt: '',
      updatedAt: ''
    },
    {
      id: 4,
      name: 'Поздравляем с Юбилеем! Александру Аркадьевичу — 75 лет!',
      description: 'Александр Аркадьевич — квалифицированный педагог, чуткий и внимательный человек. Эти качества позволяют ему находить общий язык как с преподавателями, так и со студентами, направляя их усилия в русло сотрудничества, достижения единой благородной цели — подготовки высококвалифицированных инженерных и научных кадров.',
      post: null,
      date: 'Четверг, 27 октября 2022',
      picture: '/assets/news1.jpg',
      createdAt: '',
      updatedAt: ''
    },
    {
      id: 5,
      name: 'Поздравляем с Юбилеем! Александру Аркадьевичу — 75 лет!',
      description: 'Александр Аркадьевич — квалифицированный педагог, чуткий и внимательный человек. Эти качества позволяют ему находить общий язык как с преподавателями, так и со студентами, направляя их усилия в русло сотрудничества, достижения единой благородной цели — подготовки высококвалифицированных инженерных и научных кадров.',
      post: null,
      date: 'Четверг, 27 октября 2022',
      picture: '/assets/ev.jpg',
      createdAt: '',
      updatedAt: ''
    },
    {
      id: 6,
      name: 'Поздравляем с Юбилеем! Александру Аркадьевичу — 75 лет!',
      description: 'Александр Аркадьевич — квалифицированный педагог, чуткий и внимательный человек. Эти качества позволяют ему находить общий язык как с преподавателями, так и со студентами, направляя их усилия в русло сотрудничества, достижения единой благородной цели — подготовки высококвалифицированных инженерных и научных кадров.',
      post: null,
      date: 'Четверг, 27 октября 2022',
      picture: '/assets/news1.jpg',
      createdAt: '',
      updatedAt: ''
    },
    {
      id: 7,
      name: 'Поздравляем с Юбилеем! Александру Аркадьевичу — 75 лет!',
      description: 'Александр Аркадьевич — квалифицированный педагог, чуткий и внимательный человек. Эти качества позволяют ему находить общий язык как с преподавателями, так и со студентами, направляя их усилия в русло сотрудничества, достижения единой благородной цели — подготовки высококвалифицированных инженерных и научных кадров.',
      post: null,
      date: 'Четверг, 27 октября 2022',
      picture: '/assets/ev.jpg',
      createdAt: '',
      updatedAt: ''
    },
    {
      id: 8,
      name: 'Поздравляем с Юбилеем! Александру Аркадьевичу — 75 лет!',
      description: 'Александр Аркадьевич — квалифицированный педагог, чуткий и внимательный человек. Эти качества позволяют ему находить общий язык как с преподавателями, так и со студентами, направляя их усилия в русло сотрудничества, достижения единой благородной цели — подготовки высококвалифицированных инженерных и научных кадров.',
      post: null,
      date: 'Четверг, 27 октября 2022',
      picture: '/assets/news1.jpg',
      createdAt: '',
      updatedAt: ''
    },
  ])
  const [ hoveredNews, setHoveredNews ] = React.useState<NewsIndexType>(null)
  
  const setNoCurrentNews = () => {
    setHoveredNews(null)
  }
  
  return (
    <div
      onMouseLeave={setNoCurrentNews}
      className={`news-container ${className} ${hoveredNews !== null ? 'active' : ''}`}
    >
      <ul className="news-container__news-list">
        {newsList.map((news, index) => (
          <li key={`news-${news.id}`} className={`news-list__news ${index === hoveredNews ? 'active' : ''}`}>
            <img src={news.picture} alt="" />
            <div className="news__info">
              <time className="info__date">{news.date}</time>
              <h3 className="info__heading">{news.name}</h3>
            </div>
          </li>
        ))}
      </ul>
      <ul className="news-container__news-list-duplicate">
        { newsList.map((news, index) => (
          <li key={`news-duplicate-${news.id}`} onMouseEnter={() => setHoveredNews(index)} className="news-list__news">
            <Link href={news.post ? news.post.link : ''}>
              <img src={news.picture} alt="" className="news__picture"/>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default News
