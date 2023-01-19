// global
import React from 'react'
import Link from "next/link";
import {useRecoilState, useRecoilValue} from "recoil";
// components
import WindowWithHeaderLayout, {
  WindowWithHeaderLayoutExportedDataType
} from "../../containers/WindowWithHeaderLayout/WindowWithHeaderLayout";
import CheckboxWithText from "../CheckboxWithText/CheckboxWithText";
import UrlSvg from "../UrlSvg/UrlSvg";
// recoil
import {authUserAtom} from "../../recoilAtoms/authUserrAtom";
import {settingsAtom} from "../../recoilAtoms/settingsAtom";
// styles and icons
import styles from './Profile.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAward, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
// types
import {
  AuthUser_authUser, AuthUser_authUser_profile_contacts,
  AuthUser_authUser_student_group_teachers,
  AuthUser_authUser_student_group_teachers_teacher, Settings_settings_MainUrlsSettings
} from "../../graphql/generated";
import {
  InfoTabAboutPanelProps,
  InfoTabContactsContact,
  InfoTabContactsContactProps,
  InfoTabContactsPanelProps,
  InfoTabMainInfoPanelProps,
  NavTabProps,
  ProfileAchievementProps,
  ProfileBodyLeftSideProps,
  ProfileBodyProps,
  ProfileBodyRightSideProps,
  ProfileHeaderProps,
  ProfileProps,
  ProfileUserCardProps,
  SettingsAuthContact, SettingsPassword,
  SettingsTabAuthContactsPanelProps,
  SettingsTabPasswordPanelProps,
  TabsData,
  ToggleButtonProps
} from './types';
import {NavTab, NavTabLayout, TabNav, TabNavContent} from "../TabNav/TabNav";
import PictureUpload from "../PictureUpload/PictureUpload";

const NAV_TABS: NavTab[] = [
  {id: 0, title: 'Информация', component: ProfileInfoTab},
  {id: 1, title: 'Достижения', component: ProfileAchievementsTab},
  {id: 2, title: 'Моя группа', component: ProfileGroupTab},
  {id: 3, title: 'Мои преподаватели', component: ProfileTeachersTab},
  {id: 4, title: 'Настройки', component: ProfileSettingsTab},
]

function Profile({className=''}: ProfileProps) {
  const authUser = useRecoilValue(authUserAtom)
  const [ windowData, setWindowData ] = React.useState<WindowWithHeaderLayoutExportedDataType>(null)
  
  return (
    <WindowWithHeaderLayout
      heading="Профиль"
      className={`${styles.profile} ${className}`}
      setExportedData={setWindowData}
      ToggleButton={<ToggleButton user={authUser} toggle={windowData?.toggleMenu} />}
    >
      <div className={styles.profile__content}>
        <ProfileHeader user={authUser} />
        <ProfileBody
          user={authUser}
        />
      </div>
    </WindowWithHeaderLayout>
  )
}

function ToggleButton({user, toggle}: ToggleButtonProps) {
  if (user) {
    return (
      <button className={`${styles.profile__toggle} ${styles.toggle_authed}`} onClick={toggle}>
        <img className={styles.toggle__userPicture} src={user?.profile?.pictureUrl ?? ''} alt={'Профиль'}/>
      </button>
    )
  }
  
  return (
    <Link href={'/login'} className={`${styles.profile__toggle} ${styles.toggle_authed}`}>
        Войти в личный кабинет
    </Link>
  )
}

function ProfileHeader({user}: ProfileHeaderProps) {
  const [ uploadedPicture, setUploadedPicture ] = React.useState<File | null>(null)
  
  return (
    <div className={styles.content__profileHeader}>
      <PictureUpload
        className={styles.profileHeader__bgPicture}
        contentClassName={styles.bgPicture__content}
        defaultPictureUrl={user?.profile?.pictureUrl}
        picture={uploadedPicture}
        setPicture={setUploadedPicture}
      />
      <div className={styles.profileHeader__mainUserInfo}>
        <div className={styles.mainUserInfo__wrapper}>
          <h1 className={styles.wrapper__name}>{user?.profile?.fullName}</h1>
          { user?.student?.group &&
            <>
              <h2 className={styles.wrapper__specialization}>{user.student.group.specialization?.name}</h2>
              <h2 className={styles.wrapper__group}>{user.student.group.name}</h2>
            </>
          }
        </div>
      </div>
    </div>
  )
}

function ProfileBody({user}: ProfileBodyProps) {
  const [ tabsData, setTabsData ] = React.useState<TabsData>({})

  return (
    <div className={styles.content__profileBody}>
      <ProfileBodyLeftSide
        user={user}
        tabsData={tabsData}
      />
      <ProfileBodyRightSide
        user={user}
        setTabsData={setTabsData}
      />
    </div>
  )
}

function ProfileBodyLeftSide({user, tabsData}: ProfileBodyLeftSideProps) {
  const { mainUrls } = useRecoilValue(settingsAtom)
  const [ uploadedPicture, setUploadedPicture ] = React.useState<File | null>(null)
  
  const saveChanges = (): void => {
    if (!tabsData) return
    
    const dataToUpdate: any = {}
    if (tabsData.getAbout) {
      dataToUpdate.about = tabsData.getAbout()
    }
    if (tabsData.getContacts) {
      dataToUpdate.contacts = tabsData.getContacts()
    }
    if (tabsData.getAuthContacts) {
      dataToUpdate.authContacts = tabsData.getAuthContacts()
    }
    if (tabsData.getPasswords) {
      dataToUpdate.passwords = tabsData.getPasswords()
    }
    if (tabsData.getAchievements) {
      dataToUpdate.visibleAchievements = tabsData.getAchievements()
    }
    
    return dataToUpdate
  }
  
  return (
    <div className={styles.profileBody__leftSide}>
      <PictureUpload
        className={styles.leftSide__userPicture}
        contentClassName={styles.userPicture__content}
        imageClassName={styles.userPicture__image}
        defaultPictureUrl={user?.profile?.pictureUrl}
        picture={uploadedPicture}
        setPicture={setUploadedPicture}
      />
      <h4 className={styles.leftSide__userEmail}>{user?.email}</h4>
      <Link href={user?.profileUrl ?? '#'} className={styles.leftSide__btn}>
        Профиль
      </Link>
      <button onClick={() => console.log(saveChanges())} className={styles.leftSide__btn}>
        Сохранить изменения
      </button>
      <Link href={mainUrls?.logoutUrl ?? '/auth/log-out/'} className={`${styles.leftSide__btn} ${styles.btn_accent}`}>
        Выйти
      </Link>
    </div>
  )
}

function ProfileBodyRightSide({user, setTabsData}: ProfileBodyRightSideProps) {
  const [ currentTabId, setCurrentTabId ] = React.useState<number>(0)
  
  return (
    <div className={styles.profileBody__rightSide}>
      <TabNav
        navTabs={NAV_TABS}
        currentTabId={currentTabId}
        setCurrentTabId={setCurrentTabId}
      />
      <TabNavContent
        navTabs={NAV_TABS}
        currentTabId={currentTabId}
        className={styles.rightSide__content}
        tabProps={{
          user,
          setTabsData,
          className: styles.content__tab,
        }}
      />
    </div>
  )
}

function ProfileInfoTab({user, isActive, setTabsData}: NavTabProps) {
  const aboutMe = user?.profile?.aboutMe
  const contacts = user?.profile?.contacts
  
  return (
    <NavTabLayout className={styles.tab_info} isActive={isActive}>
      <InfoTabMainInfoPanel user={user} />
      <InfoTabAboutPanel setTabsData={setTabsData} about={aboutMe} />
      <InfoTabContactsPanel setTabsData={setTabsData} user={user} initialContacts={contacts} />
    </NavTabLayout>
  )
}

function InfoTabMainInfoPanel({user}: InfoTabMainInfoPanelProps) {
  return (
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
  )
}

function InfoTabAboutPanel({about, setTabsData}: InfoTabAboutPanelProps) {
  const aboutRef = React.useRef<HTMLTextAreaElement>(null)
  
  const getAbout = (): null | string => {
    if (!aboutRef.current) return null
    
    return aboutRef.current.value
  }
  
  React.useEffect(() => {
    setTabsData?.(prev => ({
      ...prev,
      getAbout,
    }))
  }, [about])
  return (
    <div className={styles.tab__panel}>
      <h1 className={styles.panel__title}>
        Обо мне
      </h1>
      <textarea ref={aboutRef} defaultValue={about ?? ''} className={styles.panel__text}>
        {about}
      </textarea>
    </div>
  )
}

function InfoTabContactsPanel({initialContacts, user, setTabsData}: InfoTabContactsPanelProps) {
  const [ contacts, setContacts ] = React.useState<InfoTabContactsContact[]>([])
  const [ newContactId, setNewContactId ] = React.useState<number>(0)
  const contactListRef = React.useRef<HTMLUListElement>(null)
  const newContactRef = React.useRef<HTMLLIElement>(null)
  
  const getContacts = (): InfoTabContactsContact[] => {
    if (!contactListRef.current) return []
    
    const contacts = contactListRef.current.querySelectorAll(`.${styles.contactList__item}:not(.item_new)`)
    
    return Array.from(contacts).map(contact => {
      return getContactData(contact as HTMLLIElement)
    })
  }
  
  const addNewContact = () => {
    if (!newContactRef.current) return
    
    const newContact = getContactData(newContactRef.current as HTMLLIElement)
    
    setContacts(prevContacts => {
      const newContacts = [...prevContacts, newContact]
      
      return newContacts
    })
    
    clearElementsInputs(newContactRef.current)
    focusOnNewContactForm()
  }
  
  const getContactData = (contactElement: HTMLLIElement) => {
    const contactTitleInput = contactElement.querySelector('.input_title') as HTMLInputElement
    const contactValueInput = contactElement.querySelector('.input_value') as HTMLInputElement
    const contactIdInput = contactElement.querySelector('.input_id') as HTMLInputElement
    
    const contactTitle = contactTitleInput?.value
    const contactValue = contactValueInput?.value
    const contactId = contactIdInput?.value !== undefined ? contactIdInput?.value : `newContact-${newContactId}`
    
    setNewContactId(prevId => prevId + 1)
    
    return {
      title: contactTitle,
      value: contactValue,
      id: contactId
    }
  }
  
  const focusOnNewContactForm = () => {
    if (!newContactRef.current) return
    
    const input = newContactRef.current.querySelector('.input_title')
    if (!input) return
    
    (input as HTMLInputElement).focus()
  }
  
  const removeContact = (id: IdType) => {
    setContacts(prevContacts => {
      const newContacts = prevContacts.filter(contact => contact.id !== id)
      
      return newContacts
    })
  }
  
  const clearElementsInputs = (element: HTMLElement) => {
    element.querySelectorAll('input').forEach(input => {
      input.value = ''
    })
  }
  
  React.useLayoutEffect(() => {
    if (!initialContacts) return
    
    setContacts(initialContacts)
  }, [user?.id])
  
  React.useEffect(() => {
    setTabsData(prevTabsData => {
      return {
        ...prevTabsData,
        getContacts: getContacts,
      }
    })
  }, [setTabsData])
  
  return (
    <div className={styles.tab__panel}>
      <h1 className={styles.panel__title}>
        Контакты
      </h1>
      <ul ref={contactListRef} className={styles.panel__contactList}>
        { contacts && contacts.map(contact => (
          <InfoTabContactsContact
            key={contact.id}
            id={contact.id}
            title={contact.title}
            value={contact.value}
            remove={removeContact}
          />
        ))}
        <li ref={newContactRef} className={`${styles.contactList__item} item_new`}>
          <input className={`${styles.item__input} input_title`} type="text" placeholder="НАЗВАНИЕ" />
          <input className={`${styles.item__input} input_value`} type="text" placeholder="КОНТАКТ" />
          <button onClick={addNewContact} title="Добавить" className={`${styles.item__iconBtn} ${styles.iconBtn_accent}`}>
            <FontAwesomeIcon icon={faPlus} className={styles.iconBtn__icon} />
          </button>
        </li>
      </ul>
    </div>
  )
}

function InfoTabContactsContact({id, title, value, remove}: InfoTabContactsContactProps) {
  return (
    <li className={styles.contactList__item}>
      <input className={`${styles.item__input} input_id`} type="hidden" name={`contacts[${id}][id]`} value={id} />
      <input required className={`${styles.item__input} input_title`} defaultValue={title} type="text" placeholder="НАЗВАНИЕ" />
      <input required className={`${styles.item__input} input_value`} defaultValue={value} type="text" placeholder="КОНТАКТ" />
      <button title="Удалить" className={styles.item__iconBtn} onClick={() => remove(id)}>
        <FontAwesomeIcon icon={faXmark} className={styles.iconBtn__icon} />
      </button>
    </li>
  )
}

function ProfileAchievementsTab({user, isActive, setTabsData}: NavTabProps) {
  const achievementListRef = React.useRef<HTMLUListElement>(null)
  const achievements = user?.profile?.achievements ?? []
  
  const getCheckedAchievements = (): IdType[] => {
    const achievementList = achievementListRef.current
    if (!achievementList) return []
    
    const achievementsInputs = achievementList.querySelectorAll<HTMLInputElement>(`.${styles.achievementList__item} input:checked`)
    const checkedAchievements = getInputsValues(achievementsInputs)
    
    return checkedAchievements
  }
  
  const getInputsValues = (inputs: NodeListOf<HTMLInputElement>) => {
    return Array.from(inputs).map(input => (input as HTMLInputElement).value)
  }
  
  React.useEffect(() => {
    setTabsData(prevTabsData => {
      return {
        ...prevTabsData,
        getAchievements: getCheckedAchievements,
      }
    })
  }, [setTabsData])
    
  return (
    <NavTabLayout className={styles.tab_achievements} isActive={isActive}>
      <div className={styles.tab__panel}>
        <ul ref={achievementListRef} className={styles.panel__achievementList}>
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
    </NavTabLayout>
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
          value={id}
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

function ProfileGroupTab({user, isActive}: NavTabProps) {
  const students = user?.student?.group?.students ?? []
  
  return (
    <NavTabLayout className={styles.tab_group} isActive={isActive}>
      <div className={styles.tab__panel}>
        <ul className={styles.panel__userList}>
          { students.map(student => (
            <ProfileUserCard
              key={student.id}
              profileUrl={student.user.profileUrl}
              name={student.user.profile.fullName}
              picture={student.user.profile.pictureUrl}
              email={student.user.email}
              phone={student.user.phone}
            />
          ))}
        </ul>
      </div>
    </NavTabLayout>
  )
}

function ProfileTeachersTab({user, isActive}: NavTabProps) {
  const groupTeachers = user?.student?.group.teachers ?? []
  
  function getRolesFromTeacherSubjects(groupTeacher: AuthUser_authUser_student_group_teachers): string[] {
    const roles: string[] = groupTeacher.subjects.map(subject => subject.name)
    
    return roles
  }
  
  return (
    <NavTabLayout className={styles.tab_teachers} isActive={isActive}>
      <div className={styles.tab__panel}>
        <ul className={styles.panel__userList}>
          { groupTeachers.map(groupTeacher => (
            <ProfileUserCard
              key={groupTeacher.id}
              name={groupTeacher.teacher.user.profile.fullName}
              picture={groupTeacher.teacher.user.profile.pictureUrl}
              email={groupTeacher.teacher.user.email}
              phone={groupTeacher.teacher.user.phone}
              profileUrl={groupTeacher.teacher.user.profileUrl}
              roles={getRolesFromTeacherSubjects(groupTeacher) ?? null}
            />
          ))}
        </ul>
      </div>
    </NavTabLayout>
  )
}

function ProfileUserCard({name, email, phone, picture, profileUrl, roles}: ProfileUserCardProps) {
  return (
    <li className={styles.userList__item}>
      <Link href={profileUrl} className={styles.item__leftSide}>
        <img className={styles.leftSide__userImg} src={picture ?? ''} alt="" />
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

function ProfileSettingsTab({user, isActive, setTabsData}: NavTabProps) {
  const passwordRef = React.useRef<HTMLDivElement>(null)
  const contactsRef = React.useRef<HTMLDivElement>(null)
  
  const getPasswords = (): SettingsPassword[] => {
    const passwordElement = passwordRef.current
    if (!passwordElement) return []
    
    return getElementsInputsData(passwordElement)
  }
  
  const getElementsInputsData = (element: HTMLDivElement) => {
    const inputs = element.querySelectorAll<HTMLInputElement>('input')
    
    return Array.from(inputs).map(input => {
      const { name, value } = input
      
      return { name, value }
    })
  }
  
  const getAuthContacts = (): SettingsAuthContact[] => {
    const contactsElement = contactsRef.current
    if (!contactsElement) return []
    
    return getElementsInputsData(contactsElement)
  }
  
  React.useEffect(() => {
    setTabsData(prevTabsData => {
      return {
        ...prevTabsData,
        getPasswords: getPasswords,
        getAuthContacts: getAuthContacts,
      }
    })
  }, [setTabsData])
  
  return (
    <NavTabLayout className={styles.tab_settings} isActive={isActive}>
      <SettingsTabPasswordPanel passwordRef={passwordRef} />
      <SettingsTabAuthContactsPanel contactsRef={contactsRef} />
    </NavTabLayout>
  )
}

function SettingsTabPasswordPanel({passwordRef}: SettingsTabPasswordPanelProps) {
  return (
    <div className={styles.tab__panel}>
      <h1 className={styles.panel__title}>Обновить пароль</h1>
      <div ref={passwordRef} className={styles.panel__password}>
        <input type="password" className={styles.password__input} name="oldPassword" placeholder="Старый пароль" />
        <input type="password" className={styles.password__input} name="newPassword" placeholder="Новый пароль" />
        <input type="password" className={styles.password__input} name="newPasswordAgain" placeholder="Повторите новый пароль" />
      </div>
    </div>
  )
}

function SettingsTabAuthContactsPanel({contactsRef}: SettingsTabAuthContactsPanelProps) {
  return (
    <div className={styles.tab__panel}>
      <h1 className={styles.panel__title}>Обновить контакты для авторизации</h1>
      <div ref={contactsRef} className={styles.panel__contacts}>
        <input type="email" className={styles.contacts__input} name="email" placeholder="Новый email" />
        <input type="phone" className={styles.contacts__input} name="phone" placeholder="Новый телефон" />
      </div>
    </div>
  )
}

export default Profile
