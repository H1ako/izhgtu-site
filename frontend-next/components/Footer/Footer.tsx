// global
import React from 'react'
import Link from "next/link";
// components
import ContactForm from "../forms/ContactForm/ContactForm";
import SocialsList from "../SocialsList/SocialsList";
import InnerBlockHeading from "../InnerBlockHeading/InnerBlockHeading";
// styles and icons
import '../../styles/components/Footer.module.scss';

function Footer() {
  return (
      <footer className="main-footer">
        <InnerBlockHeading className="main-footer__heading">
          ИЖГТУ
        </InnerBlockHeading>
        <div className="main-footer__content">
          <div className="content__left-side">
            <nav className="left-side__useful-links">
              <ul className="useful-links__list">
                <li>
                  <Link href='/'>Главная</Link>
                </li>
                <li>
                  <Link href='/'>электронный журнал</Link>
                </li>
                <li>
                  <Link href='/'>расписание</Link>
                </li>
                <li>
                  <Link href='/'>частые вопросы</Link>
                </li>
                <li>
                  <Link href='/'>образование</Link>
                </li>
                <li>
                  <Link href='/'>Новости</Link>
                </li>
                <li>
                  <Link href='/'>Контакты</Link>
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
