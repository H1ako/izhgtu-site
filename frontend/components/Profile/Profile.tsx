// global
import React from 'react'
import Link from "next/link";
import {useRecoilValue} from "recoil";
// components
import WindowWithHeaderLayout from "../../containers/WindowWithHeaderLayout/WindowWithHeaderLayout";
// recoil
import {authUserAtom} from "../../recoilAtoms/authUserrAtom";
// styles and icons
import styles from './Profile.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAward, faXmark} from "@fortawesome/free-solid-svg-icons";
// types
import {AuthUser_authUser} from "../../graphql/generated";
import CheckboxWithText from "../CheckboxWithText/CheckboxWithText";

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
  description: string,
  icon: any,
  showInProfile: boolean,
}

interface ProfileUserCardProps {
  name: string,
  email: string,
  phone?: string,
  picture?: string | null,
  role?: string,
  id: IdType
}

interface NavTab {
  id: number,
  title: string,
  component: React.FC<NavTabProps>
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
  
  return (
    <WindowWithHeaderLayout heading="Профиль" className={`${styles.profile} ${className}`} ToggleButton={
      <button className={styles.profile__toggle}>
        <img className={styles.toggle__userPicture} src={authUser?.pictureUrl ?? ''} alt={authUser?.fullName}/>
      </button>
    }>
      <div className={styles.profile__content}>
        <div className={styles.content__profileHeader}>
          <img src={authUser?.bgPictureUrl ?? ''} alt="" className={styles.profileHeader__bgPicture}/>
          <div className={styles.profileHeader__mainUserInfo}>
            <h2 className={styles.mainUserInfo__name}>{authUser?.fullName}</h2>
            { authUser?.student?.group &&
              <>
                <h3 className={styles.mainUserInfo__specialization}>{authUser.student.group.specialization?.name}</h3>
                <h3 className={styles.mainUserInfo__group}>{authUser.student.group.name}</h3>
              </>
            }
          </div>
        </div>
        <div className={styles.content__profileBody}>
          <div className={styles.profileBody__leftSide}>
            <img className={styles.leftSide__userPicture} src={authUser?.pictureUrl ?? ''} alt='' />
            <h4 className={styles.leftSide__userEmail}>{authUser?.email}</h4>
            <Link href={'/profile/'} className={styles.leftSide__btn}>
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
            <nav className={styles.rightSide__nav}>
              <ul className={styles.nav__list}>
                {NAV_TABS.map(tab => (
                  <li key={tab.id} className={styles.list__item}>
                    <button
                      className={`${styles.item__btn} ${currentTabIndex === tab.id ? styles.btn_active : ''}`}
                      onClick={() => setCurrentTabIndex(tab.id)}
                    >
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
    <div className={styles.content__tab}>
      <div className={styles.tab__panel}>
        <h4 className={styles.panel__item}>
          Группа: <span className={styles.item__value}>{user?.student?.group?.name}</span>
        </h4>
        <h4 className={styles.panel__item}>
          Курс: <span className={styles.item__value}>{user?.student?.group?.year}</span>
        </h4>
        <h4 className={styles.panel__item}>
          Специализация: <span className={styles.item__value}>{user?.student?.group?.specialization?.name}</span>
        </h4>
        <h4 className={styles.panel__item}>
          Факультет: <span className={styles.item__value}>{user?.student?.group?.specialization?.faculty?.name}</span>
        </h4>
        <h4 className={styles.panel__item}>
          Квалицикация: <span className={styles.item__value}>{user?.student?.group?.specialization?.faculty?.educationType?.name}</span>
        </h4>
        <h4 className={styles.panel__item}>
          Корпус Обучения:
        </h4>
      </div>
      <div className={styles.tab__panel}>
        <h3 className={styles.panel__title}>
          Обо мне
        </h3>
        <p className={styles.panel__text}>
          Salesian College Chadstone is a welcoming Catholic community renowned for its integrity and creative learning approaches that bring out the best in boys. Our rich Salesian charism underpinned by the educational principles of founder, St John Bosco, provides the foundation of a future focused pedagogical vision.
          {/*{user?.profile?.aboutMe}*/}
        </p>
      </div>
      <div className={styles.tab__panel}>
        <h3 className={styles.panel__title}>
          Контакты
        </h3>
        <ul className={styles.panel__contactList}>
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
  const achievements: ProfileAchievementProps[] = [
    {
      id: 1,
      title: 'Спортивный',
      description: 'Победитель в соревнованиях по баскетболу',
      icon: '',
      showInProfile: true
    },
    {
      id: 2,
      title: 'Спортивный',
      description: 'Победитель в соревнованиях по баскетболу',
      icon: '',
      showInProfile: true
    },
    {
      id: 3,
      title: 'Спортивный',
      description: 'Победитель в соревнованиях по баскетболу',
      icon: '',
      showInProfile: true
    },
    ]
    
  return (
    <div className={styles.content__tab}>
      <div className={styles.tab__panel}>
        <ul className={styles.panel__achievementList}>
          { achievements.map(achievement => (
            <ProfileAchievement
              key={achievement.id}
              id={achievement.id}
              title={achievement.title}
              description={achievement.description}
              icon={achievement.icon}
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
          <FontAwesomeIcon icon={faAward} className={styles.icon__icon} />
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
        <div className={styles.rightSide__description} dangerouslySetInnerHTML={{__html: description}} />
      </span>
    </li>
  )
}

function ProfileGroupTab({user}: NavTabProps) {
  const users: ProfileUserCardProps[] = [
    {
      id: 1,
      name: 'Иванов Иван Иванович',
      picture: '',
      email: '',
      phone: '',
    },
    {
      id: 2,
      name: 'Иванов Иван Иванович',
      picture: '',
      email: '',
      phone: '',
    },
    ]
  return (
    <div className={styles.content__tab}>
      <div className={styles.tab__panel}>
        <ul className={styles.panel__userList}>
          { users.map(user => (
            <ProfileUserCard
              key={user.id}
              id={user.id}
              name={user.name}
              picture={user.picture}
              email={user.email}
              phone={user.phone}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

function ProfileTeachersTab({user}: NavTabProps) {
  const users: ProfileUserCardProps[] = [
    {
      id: 1,
      name: 'Иванов Иван Иванович',
      picture: '',
      email: '',
      phone: '',
      role: 'Математика'
    },
    {
      id: 2,
      name: 'Иванов Иван Иванович',
      picture: '',
      email: '',
      phone: '',
      role: 'Математика'
    },
    ]
  return (
    <div className={styles.content__tab}>
      <div className={styles.tab__panel}>
        <ul className={styles.panel__userList}>
          { users.map(user => (
            <ProfileUserCard
              key={user.id}
              id={user.id}
              name={user.name}
              picture={user.picture}
              email={user.email}
              phone={user.phone}
              role={user.role}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

function ProfileUserCard({name, email, phone, picture, id, role}: ProfileUserCardProps) {
  return (
    <li className={styles.userList__item}>
      <span className={styles.item__leftSide}>
        <img className={styles.leftSide__userImg} src={picture ?? ''} alt="user" />
        <h4 className={styles.leftSide__role}>{role}</h4>
      </span>
      <span className={styles.item__rightSide}>
        <h3 className={styles.rightSide__name}>{name}</h3>
        <h4 className={styles.rightSide__email}>{email}</h4>
        <h4 className={styles.rightSide__phone}>{phone}</h4>
      </span>
    </li>
  )
}

function ProfileSettingsTab({user}: NavTabProps) {
  return (
    <div className={styles.content__tab}>
      <div className={styles.tab__panel}>
        <h3 className={styles.panel__title}>Обновить пароль</h3>
        <div className={styles.panel__password}>
          <input type="password" className={styles.password__input} placeholder="Старый пароль" />
          <input type="password" className={styles.password__input} placeholder="Новый пароль" />
          <input type="password" className={styles.password__input} placeholder="Повторите новый пароль" />
        </div>
      </div>
      <div className={styles.tab__panel}>
        <h3 className={styles.panel__title}>Обновить контакты для авторизации</h3>
        <div className={styles.panel__contacts}>
          <input type="text" className={styles.contacts__input} placeholder="Новый email" />
          <input type="text" className={styles.contacts__input} placeholder="Новый телефон" />
        </div>
      </div>
    </div>
  )
}

export default Profile
