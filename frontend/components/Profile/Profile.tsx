// global
import React from 'react'
import Link from "next/link";
import {useRecoilValue} from "recoil";
// components
import WindowWithHeaderLayout from "../../containers/WindowWithHeaderLayout/WindowWithHeaderLayout";
import CheckboxWithText from "../CheckboxWithText/CheckboxWithText";
// recoil
import {authUserAtom} from "../../recoilAtoms/authUserrAtom";
// styles and icons
import styles from './Profile.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAward, faXmark} from "@fortawesome/free-solid-svg-icons";
// types
import {
  AuthUser_authUser,
  AuthUser_authUser_student_group_teachers,
  AuthUser_authUser_student_group_teachers_teacher
} from "../../graphql/generated";
import UrlSvg from "../UrlSvg/UrlSvg";

interface ProfileProps {
  className?: string
}

interface ProfileBodyContentProps {
  currentTabId: number,
  user: AuthUser_authUser | null
}

interface NavTabProps {
  user: AuthUser_authUser | null,
}

interface ProfileAchievementProps {
  id: IdType,
  title: string,
  description: string | null,
  icon: any,
  showInProfile: boolean,
}

interface ProfileUserCardProps {
  name: string,
  email: string,
  phone?: string | null,
  picture?: string | null,
  roles?: string[] | null,
  profileUrl: string,
}

interface NavTab {
  id: number,
  title: string,
  component: React.FC<NavTabProps>
}

interface ActiveTabWidthAndLeft {
  width: number,
  left: number
}

const NAV_TABS: NavTab[] = [
  {id: 0, title: 'Информация', component: ProfileInfoTab},
  {id: 1, title: 'Достижения', component: ProfileAchievementsTab},
  {id: 2, title: 'Моя группа', component: ProfileGroupTab},
  {id: 3, title: 'Мои преподаватели', component: ProfileTeachersTab},
  {id: 4, title: 'Настройки', component: ProfileSettingsTab},
]


function Profile({className=''}: ProfileProps) {
  const authUser = useRecoilValue(authUserAtom)
  const [ currentTabIndex, setCurrentTabIndex ] = React.useState<number>(0)
  const tabNav = React.useRef<HTMLDivElement>(null)
  
  const getActiveTabWidthAndLeft = (): ActiveTabWidthAndLeft => {
    const activeTab = document.querySelector(`.${styles.nav__list} .item_active`)
    if (!activeTab || !tabNav.current) return {
      width: 0,
      left: 0
    }
    
    const left = (activeTab as HTMLDivElement).offsetLeft
    // we don't use offsetWidth because it's not working with initial width because of scrollbar
    const { width } = activeTab.getBoundingClientRect()
    
    return { width, left }
  }
  
  const setPropertyToTabNav = (property: string, value: string) => {
    if (!tabNav.current) return
    
    tabNav.current.style.setProperty(property, value)
  }
  
  React.useEffect(() => {
    const { width, left } = getActiveTabWidthAndLeft()
    
    setPropertyToTabNav('--highlighterWidth', `${width}px`)
    setPropertyToTabNav('--highlighterLeft', `${left}px`)
  }, [currentTabIndex])
  
  return (
    <WindowWithHeaderLayout
      heading="Профиль"
      className={`${styles.profile} ${className}`}
      ToggleButton={
        <button className={styles.profile__toggle}>
          <img className={styles.toggle__userPicture} src={authUser?.pictureUrl ?? ''} alt={authUser?.fullName}/>
        </button>
    }>
      <div className={styles.profile__content}>
        <div className={styles.content__profileHeader}>
          <img src={authUser?.bgPictureUrl ?? ''} alt="" className={styles.profileHeader__bgPicture}/>
          <div className={styles.profileHeader__mainUserInfo}>
            <div className={styles.mainUserInfo__wrapper}>
              <h1 className={styles.wrapper__name}>{authUser?.fullName}</h1>
              { authUser?.student?.group &&
                <>
                  <h2 className={styles.wrapper__specialization}>{authUser.student.group.specialization?.name}</h2>
                  <h2 className={styles.wrapper__group}>{authUser.student.group.name}</h2>
                </>
              }
            </div>
          </div>
        </div>
        <div className={styles.content__profileBody}>
          <div className={styles.profileBody__leftSide}>
            <img className={styles.leftSide__userPicture} src={authUser?.pictureUrl ?? ''} alt='' />
            <h4 className={styles.leftSide__userEmail}>{authUser?.email}</h4>
            <Link href={authUser?.profileUrl ?? '#'} className={styles.leftSide__btn}>
              Профиль
            </Link>
            <button className={styles.leftSide__btn}>
              Сохранить изменения
            </button>
            <button className={`${styles.leftSide__btn} ${styles.btn_accent}`}>
              Выйти
            </button>
          </div>
          <div className={styles.profileBody__rightSide}>
            <nav ref={tabNav} className={styles.rightSide__nav}>
              <ul className={styles.nav__list}>
                {NAV_TABS.map(tab => (
                  <li
                    key={tab.id}
                    className={`${styles.list__item} ${tab.id === currentTabIndex ? 'item_active' : ''}`}
                  >
                    <button className={styles.item__btn} onClick={() => setCurrentTabIndex(tab.id)}>
                      {tab.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <ProfileBodyContent user={authUser} currentTabId={currentTabIndex} />
          </div>
        </div>
      </div>
    </WindowWithHeaderLayout>
  )
}

function ProfileBodyContent({currentTabId, user}: ProfileBodyContentProps) {
  const Tab = NAV_TABS.find(tab => tab.id === currentTabId)?.component
  if (!Tab) return null
  
  return (
    <div className={styles.rightSide__content}>
      <Tab user={user} />
    </div>
  )
}

function ProfileInfoTab({user}: NavTabProps) {
  return (
    <div className={`${styles.content__tab} ${styles.tab_info}`}>
      <div className={styles.tab__panel}>
        <h4 className={styles.panel__item}>
          <span className={styles.item__label}>Группа:</span>
          {user?.student?.group?.name}
        </h4>
        <h4 className={styles.panel__item}>
          <span className={styles.item__label}>Курс:</span>
          {user?.student?.group?.year}
        </h4>
        <h4 className={styles.panel__item}>
          <span className={styles.item__label}>Специализация:</span>
          {user?.student?.group?.specialization?.name}
        </h4>
        <h4 className={styles.panel__item}>
          <span className={styles.item__label}>Факультет:</span>
          {user?.student?.group?.specialization?.faculty?.name}
        </h4>
        <h4 className={styles.panel__item}>
          <span className={styles.item__label}>Квалицикация:</span>
          {user?.student?.group?.specialization?.faculty?.educationType?.name}
        </h4>
        <h4 className={styles.panel__item}>
          <span className={styles.item__label}>Корпус Обучения:</span>
          {user?.student?.learningBuilding}
        </h4>
      </div>
      <div className={styles.tab__panel}>
        <h1 className={styles.panel__title}>
          Обо мне
        </h1>
        <p className={styles.panel__text}>
          {user?.profile?.aboutMe}
        </p>
      </div>
      <div className={styles.tab__panel}>
        <h1 className={styles.panel__title}>
          Контакты
        </h1>
        <ul className={styles.panel__contactList}>
          <li className={styles.contactList__item}>
            <input className={styles.item__input} type="text" placeholder="НАЗВАНИЕ" />
            <input className={styles.item__input} type="text" placeholder="КОНТАКТ" />
            <button className={styles.item__iconBtn}>
              <FontAwesomeIcon icon={faXmark} className={styles.iconBtn__icon} />
            </button>
          </li>
          <li className={styles.contactList__item}>
            <input className={styles.item__input} type="text" placeholder="НАЗВАНИЕ" />
            <input className={styles.item__input} type="text" placeholder="КОНТАКТ" />
            <button className={styles.item__iconBtn}>
              <FontAwesomeIcon icon={faXmark} className={styles.iconBtn__icon} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

function ProfileAchievementsTab({user}: NavTabProps) {
  const achievements = user?.profile?.achievements ?? []
    
  return (
    <div className={`${styles.content__tab} ${styles.tab_achievements}`}>
      <div className={styles.tab__panel}>
        <ul className={styles.panel__achievementList}>
          { achievements.map(achievement => (
            <ProfileAchievement
              key={achievement.id}
              id={achievement.id}
              title={achievement.achievement.title}
              description={achievement.achievement.shortDescription}
              icon={achievement.achievement.icon?.fullUrl}
              showInProfile={achievement.showInProfile}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

function ProfileAchievement({showInProfile, id, title, description, icon}: ProfileAchievementProps) {
  const [ checked, setChecked ] = React.useState<boolean>(showInProfile)
  
  React.useEffect(() => {
    setChecked(showInProfile)
  }, [showInProfile])
  
  return (
    <li className={styles.achievementList__item}>
      <span className={styles.item__leftSide}>
        <div className={styles.leftSide__icon}>
          <UrlSvg url={icon} className={styles.icon__icon} />
        </div>
        <CheckboxWithText
          text='ПОКАЗЫВАТЬ'
          className={styles.leftSide__checkbox}
          value={`achievement-${id}`}
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </span>
      <span className={styles.item__rightSide}>
        <h3 className={styles.rightSide__title}>{title}</h3>
        <p className={styles.rightSide__description}>{description}</p>
      </span>
    </li>
  )
}

function ProfileGroupTab({user}: NavTabProps) {
  const students = user?.student?.group?.students ?? []
  
  return (
    <div className={`${styles.content__tab} ${styles.tab_group}`}>
      <div className={styles.tab__panel}>
        <ul className={styles.panel__userList}>
          { students.map(student => (
            <ProfileUserCard
              key={student.id}
              profileUrl={student.user.profileUrl}
              name={student.user.fullName}
              picture={student.user.pictureUrl}
              email={student.user.email}
              phone={student.user.phone}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

function ProfileTeachersTab({user}: NavTabProps) {
  const groupTeachers = user?.student?.group.teachers ?? []
  
  function getRolesFromTeacherSubjects(groupTeacher: AuthUser_authUser_student_group_teachers): string[] {
    const roles: string[] = groupTeacher.subjects.map(subject => subject.name)
    
    return roles
  }
  
  return (
    <div className={`${styles.content__tab} ${styles.tab_teachers}`}>
      <div className={styles.tab__panel}>
        <ul className={styles.panel__userList}>
          { groupTeachers.map(groupTeacher => (
            <ProfileUserCard
              key={groupTeacher.id}
              name={groupTeacher.teacher.user.fullName}
              picture={groupTeacher.teacher.user.pictureUrl}
              email={groupTeacher.teacher.user.email}
              phone={groupTeacher.teacher.user.phone}
              profileUrl={groupTeacher.teacher.user.profileUrl}
              roles={getRolesFromTeacherSubjects(groupTeacher) ?? null}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

function ProfileUserCard({name, email, phone, picture, profileUrl, roles}: ProfileUserCardProps) {
  return (
    <li className={styles.userList__item}>
      <Link href={profileUrl} className={styles.item__leftSide}>
        <img className={styles.leftSide__userImg} src={picture ?? ''} alt="user" />
        <ul className={styles.leftSide__roles}>
          { roles && roles.map(role => (
            <li className={styles.roles__item} key={`role-${role}`}>
              {role}
            </li>
          ))}
        </ul>
      </Link>
      <span className={styles.item__rightSide}>
        <Link href={profileUrl} className={styles.rightSide__name}>{name}</Link>
        <h4 className={styles.rightSide__email}>{email}</h4>
        <h4 className={styles.rightSide__phone}>{phone}</h4>
      </span>
    </li>
  )
}

function ProfileSettingsTab({user}: NavTabProps) {
  return (
    <div className={`${styles.content__tab} ${styles.tab_settings}`}>
      <div className={styles.tab__panel}>
        <h1 className={styles.panel__title}>Обновить пароль</h1>
        <div className={styles.panel__password}>
          <input type="password" className={styles.password__input} placeholder="Старый пароль" />
          <input type="password" className={styles.password__input} placeholder="Новый пароль" />
          <input type="password" className={styles.password__input} placeholder="Повторите новый пароль" />
        </div>
      </div>
      <div className={styles.tab__panel}>
        <h1 className={styles.panel__title}>Обновить контакты для авторизации</h1>
        <div className={styles.panel__contacts}>
          <input type="text" className={styles.contacts__input} placeholder="Новый email" />
          <input type="text" className={styles.contacts__input} placeholder="Новый телефон" />
        </div>
      </div>
    </div>
  )
}

export default Profile
