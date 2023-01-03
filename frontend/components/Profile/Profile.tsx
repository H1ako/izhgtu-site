// global
import React from 'react'
import {useRecoilValue} from "recoil";
// components
import WindowWithHeaderLayout from "../../containers/WindowWithHeaderLayout/WindowWithHeaderLayout";
// recoil
import {authUserAtom} from "../../recoilAtoms/authUserrAtom";
// styles and icons
import styles from './Profile.module.scss';
import Link from "next/link";
import {AuthUser_authUser} from "../../graphql/generated";

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
      Информация
    </div>
  )
}

function ProfileAchievementsTab({user}: NavTabProps) {
  return (
    <div className={styles.content__tab}>
      Достижения
    </div>
  )
}

function ProfileGroupTab({user}: NavTabProps) {
  return (
    <div className={styles.content__tab}>
      Группа
    </div>
  )
}

function ProfileTeachersTab({user}: NavTabProps) {
  return (
    <div className={styles.content__tab}>
      Преподаватели
    </div>
  )
}

function ProfileSettingsTab({user}: NavTabProps) {
  return (
    <div className={styles.content__tab}>
      Настройки
    </div>
  )
}

export default Profile
