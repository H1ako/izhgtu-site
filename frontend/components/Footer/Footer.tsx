// global
import React from 'react'
import Link from "next/link";
// components
import ContactForm from "../forms/ContactForm/ContactForm";
import SocialsList from "../SocialsList/SocialsList";
import InnerBlockHeading from "../InnerBlockHeading/InnerBlockHeading";
// styles and icons
import styles from './Footer.module.scss';

function Footer() {
  return (
      <footer className={styles.mainFooter}>
        <InnerBlockHeading className={styles.mainFooter__heading}>
          ИЖГТУ
        </InnerBlockHeading>
        <div className={styles.mainFooter__content}>
          <div className={styles.content__leftSide}>
            <nav className={styles.leftSide__usefulLinks}>
              <ul className={styles.usefulLinks__list}>
                <li>
                  <Link className={styles.list__link} href='/'>Главная</Link>
                </li>
                <li>
                  <Link className={styles.list__link} href='/'>электронный журнал</Link>
                </li>
                <li>
                  <Link className={styles.list__link} href='/'>расписание</Link>
                </li>
                <li>
                  <Link className={styles.list__link} href='/'>частые вопросы</Link>
                </li>
                <li>
                  <Link className={styles.list__link} href='/'>образование</Link>
                </li>
                <li>
                  <Link className={styles.list__link} href='/'>Новости</Link>
                </li>
                <li>
                  <Link className={styles.list__link} href='/'>Контакты</Link>
                </li>
              </ul>
            </nav>
            <SocialsList />
          </div>
          <ContactForm />
        </div>
        <div className={styles.mainFooter__rights}>
          <h5 className={styles.rights__right}>
            Использование материалов, размещенных на сайте, допускается только с письменного разрешения ИжГТУ им. М.Т. Калашникова или соответствующего правообладателя
          </h5>
          <h5 className={styles.rights__right}>
            Запрещается автоматизированное извлечение размещенной информации любыми сервисами без официального разрешения ИжГТУ им. М.Т. Калашникова
          </h5>
        </div>
        <h5 className={styles.mainFooter__siteDeveloper}>
          developed by sobolev nikita
        </h5>
      </footer>
  )
}

export default Footer
