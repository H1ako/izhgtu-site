// global
import React from 'react'
// components
import {Link} from "react-router-dom";
import ContactForm from "../forms/ContactForm/ContactForm";
import SocialsList from "../SocialsList/SocialsList";
// styles and icons
import './Footer.scss';

function Footer() {
  return (
      <footer className="main-footer">
        <div className="main-footer__content">
          <div className="content__left-side">
            <nav className="left-side__useful-links">
              <ul className="useful-links__list">
                <li>
                  <Link to='/'>Главная</Link>
                </li>
                <li>
                  <Link to='/'>электронный журнал</Link>
                </li>
                <li>
                  <Link to='/'>расписание</Link>
                </li>
                <li>
                  <Link to='/'>частые вопросы</Link>
                </li>
                <li>
                  <Link to='/'>образование</Link>
                </li>
                <li>
                  <Link to='/'>Новости</Link>
                </li>
                <li>
                  <Link to='/'>Контакты</Link>
                </li>
              </ul>
            </nav>
            <SocialsList />
          </div>
          <ContactForm />
        </div>
        <div className="main-footer__rights">
          <h5 className="rights__right">
            Использование материалов, размещенных на сайте, допускается только с письменного разрешения ИжГТУ им. М.Т. Калашникова или соответствующего правообладателя
          </h5>
          <h5 className="rights__right">
            Запрещается автоматизированное извлечение размещенной информации любыми сервисами без официального разрешения ИжГТУ им. М.Т. Калашникова
          </h5>
        </div>
        <h5 className="main-footer__site-developer">
          developed by sobolev nikita
        </h5>
      </footer>
  )
}

export default Footer
