// global
import React from 'react'
import Link from "next/link";
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import FacePictureBlock from "../../components/FacePictureBlock/FacePictureBlock";
// styles
import styles from './BlogPostPage.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
// types



function BlogPostPage({}: any) {
  return (
    <PageLayout>
      <FacePictureBlock>
        <div className="postHeading">
          <h3 className="postHeading__category">Жизнь университета</h3>
          <h1 className="postHeading__name">Поздравляем с юбилеем! Александру Аркадьевичу— 75 лет!</h1>
        </div>
      </FacePictureBlock>
      <div className="content">
        <div className="content__postBody">
          Коллектив преподавателей и сотрудников кафедры «Прикладная математика и информационные технологии» факультета «Математика и естественные науки» поздравляет кандидата физико-математических наук, доцента Александра Аркадьевича Айзиковича со знаменательным юбилеем!
          За годы работы в качестве заведующего кафедрой «Прикладная математика и информатика» Александром Аркадьевичем было подготовлено большое количество квалифицированных кадров по направлениям специалитета и бакалавриата «Прикладная математика». Его ученики востребованы на предприятиях многих городов Российской Федерации — г. Ижевск, г. Пермь, г. Казань, г. Екатеринбург и др. Под его руководством в настоящее время успешно реализуется специальность среднего профессионального образования «Прикладная информатика (по отраслям)» и «Информационные системы и программирование». Многие из его выпускников успешно продолжают обучение в нашем университете.
          Александр Аркадьевич — квалифицированный педагог, чуткий и внимательный человек. Эти качества позволяют ему находить общий язык как с преподавателями, так и со студентами, направляя их усилия в русло сотрудничества, достижения единой благородной цели — подготовки высококвалифицированных инженерных и научных кадров. Его трудолюбие и высокое чувство ответственности за порученное дело вызывают наше глубокое уважение. Уверены, что впереди у Александра Аркадьевича много замечательных планов и дел, которые нужно развивать на благо университета.
          Преподаватели и сотрудники кафедры «Прикладная математика и информационные технологии» желают уважаемому юбиляру крепкого здоровья на многие годы, благополучия, успехов и удовлетворения от работы!
        </div>
        <ul className="content__postTags">
          <li>
            <Link className={'postTags__tag'} href={'#'}>Жизнь университета</Link>
          </li>
        </ul>
        <div className="content__inlineWrapper">
          <div className="inlineWrapper__author"></div>
          <div className="inlineWrapper__btns">
            <button className="btns__btn">
              <FontAwesomeIcon icon={faDownload} />
              <span className="btn__text">Скачать</span>
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default BlogPostPage
