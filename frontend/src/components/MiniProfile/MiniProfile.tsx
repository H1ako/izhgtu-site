// global
import React from 'react'
// styles and icons
import './MiniProfile.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

function MiniProfile() {
  const [ isWindowVisible, setIsWindowVisible ] = React.useState<boolean>(false)
  
  return (
      <div className="mini-profile">
        <button className="mini-profile__btn">Оплата</button>
        <div className="mini-profile__user" onClick={() => setIsWindowVisible(state => !state)}>
          <div className="user__info">
            <h4 className="info__part info__name">Соболев Никита</h4>
            <h5 className="info__part info__group">Д22-021-1</h5>
          </div>
          <img src="/static/ava.png" alt="" className="user__picture"/>
          <FontAwesomeIcon icon={faChevronDown} className={`arrow-icon ${isWindowVisible && 'active'}`} />
        </div>
        { isWindowVisible &&
          <div className="mini-profile__window">
            <div className="window__profile-bg">
              <img src="/static/ava.png" alt="" className="profile-bg__user-picture"/>
              <img src="/static/user-bg.jpg" alt="" className="profile-bg__user-bg"/>
              <ul className="profile-bg__roles">
                <li className="roles__role">Д22-021-1</li>
                <li className="roles__role">Отличник</li>
                <li className="roles__role">Студент</li>
                <li className="roles__role">Специалист</li>
              </ul>
            </div>
            <div className="window__content">
              <div className="content__user-info">
                <h4 className="user-info__part user-info__email">
                  <mark>Email:</mark> nikita-sobolev-wd@yandex.ru
                </h4>
                <h4 className="user-info__part user-info__email">
                  <mark>Телефон:</mark> +79123456789
                </h4>
                <h4 className="user-info__part user-info__email">
                  <mark>Специальность:</mark> Специалист по информационным сетям
                </h4>
              </div>
              <ul className="content__links">
                <li className="links__link">
                  <a href="/profile">Личный Кабинет</a>
                </li>
                <li className="links__link">
                  <a href="/achievements">Достижения</a>
                </li>
                <li className="links__link">
                  <a href="/settings">Настройки</a>
                </li>
                <li className="links__link exit-link">
                  <a href="/auth/log-out">Выход</a>
                </li>
              </ul>
            </div>
          </div>
        }
      </div>
  )
}

export default MiniProfile
